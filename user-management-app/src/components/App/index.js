import React, { useState, useEffect, useMemo } from 'react';
import * as apiService from '../../services/apiService';
import UserTable from '../UserTable';
import Controls from '../Controls';
import Pagination from '../Pagination';
import UserFormModal from '../UserFormModal';
import FilterPopup from '../FilterPopup';
import { AppContainer, LoadingText, ErrorText } from './styles';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({ currentPage: 1, usersPerPage: 10 });
  
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const fetchedUsers = await apiService.getUsers();
        // The API returns 'name' but the prompt implies 'firstName' and 'lastName'
        // We'll derive them for better filtering/sorting.
        const adaptedUsers = fetchedUsers.map(u => ({
          ...u,
          firstName: u.name.split(' ')[0],
          lastName: u.name.split(' ').slice(1).join(' '),
          department: u.company.name, // Assumption: department is company name
        }));
        setUsers(adaptedUsers);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    let sortedUsers = [...users];

    // Filtering
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        sortedUsers = sortedUsers.filter(user => 
          user[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
        );
      }
    });

    // Searching
    if (searchTerm) {
      sortedUsers = sortedUsers.filter(user =>
        Object.values(user).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    // Sorting
    if (sortConfig.key) {
      sortedUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedUsers;
  }, [users, searchTerm, sortConfig, filters]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.usersPerPage;
    return filteredUsers.slice(startIndex, startIndex + pagination.usersPerPage);
  }, [filteredUsers, pagination]);
  
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const handleAddUser = async (userData) => {
    try {
      // JSONPlaceholder will simulate the creation and return an object with a new ID
      const newUser = await apiService.createUser(userData);
      // Optimistically add to the UI
      setUsers(prev => [ ...prev, { ...userData, id: newUser.id, name: `${userData.firstName} ${userData.lastName}` }]);
      setIsFormModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      await apiService.updateUser(userData.id, userData);
      setUsers(prev => prev.map(u => u.id === userData.id ? { ...u, ...userData, name: `${userData.firstName} ${userData.lastName}` } : u));
      setIsFormModalOpen(false);
      setEditingUser(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await apiService.deleteUser(userId);
        setUsers(prev => prev.filter(u => u.id !== userId));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setIsFormModalOpen(true);
  };

  const openAddModal = () => {
    setEditingUser(null);
    setIsFormModalOpen(true);
  };
  
  return (
    <AppContainer>
      <h1>User Management</h1>
      <Controls
        searchTerm={searchTerm}
        onSearchChange={e => setSearchTerm(e.target.value)}
        onAdd={openAddModal}
        onFilter={() => setIsFilterPopupOpen(true)}
        usersPerPage={pagination.usersPerPage}
        onUsersPerPageChange={e => setPagination({ ...pagination, usersPerPage: Number(e.target.value), currentPage: 1 })}
      />
      {loading && <LoadingText>Loading users...</LoadingText>}
      {error && <ErrorText>Error: {error}</ErrorText>}
      {!loading && !error && (
        <>
          <UserTable 
            users={paginatedUsers} 
            onSort={handleSort}
            sortConfig={sortConfig}
            onEdit={openEditModal}
            onDelete={handleDeleteUser}
          />
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={Math.ceil(filteredUsers.length / pagination.usersPerPage)}
            onPageChange={page => setPagination({ ...pagination, currentPage: page })}
          />
        </>
      )}
      {isFormModalOpen && (
        <UserFormModal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          onSubmit={editingUser ? handleUpdateUser : handleAddUser}
          initialData={editingUser}
        />
      )}
      {isFilterPopupOpen && (
        <FilterPopup
          isOpen={isFilterPopupOpen}
          onClose={() => setIsFilterPopupOpen(false)}
          onApply={(newFilters) => {
            setFilters(newFilters);
            setPagination({ ...pagination, currentPage: 1 });
            setIsFilterPopupOpen(false);
          }}
        />
      )}
    </AppContainer>
  );
};

export default App;