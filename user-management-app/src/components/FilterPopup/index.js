import React, { useState } from 'react';
import { ModalOverlay, ModalContent, ModalHeader, CloseButton, Form, FormGroup, Label, Input, SubmitButton } from '../UserFormModal/styles'; // Reusing styles

const FilterPopup = ({ isOpen, onClose, onApply }) => {
  const [filters, setFilters] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApply = (e) => {
    e.preventDefault();
    onApply(filters);
  };

  const handleClear = () => {
    const clearedFilters = { firstName: '', lastName: '', email: '', department: '' };
    setFilters(clearedFilters);
    onApply(clearedFilters);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <h2>Filter Users</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <Form onSubmit={handleApply}>
          <FormGroup>
            <Label>First Name</Label>
            <Input name="firstName" value={filters.firstName} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Last Name</Label>
            <Input name="lastName" value={filters.lastName} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" name="email" value={filters.email} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Department</Label>
            <Input name="department" value={filters.department} onChange={handleChange} />
          </FormGroup>
          <div style={{ display: 'flex', gap: '10px' }}>
            <SubmitButton type="button" onClick={handleClear} style={{ backgroundColor: '#6c757d' }}>Clear Filters</SubmitButton>
            <SubmitButton type="submit">Apply Filters</SubmitButton>
          </div>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default FilterPopup;