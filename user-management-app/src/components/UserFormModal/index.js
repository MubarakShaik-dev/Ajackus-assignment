import React, { useState, useEffect } from 'react';
import { ModalOverlay, ModalContent, ModalHeader, CloseButton, Form, FormGroup, Label, Input, SubmitButton } from './styles';

const UserFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    } else {
      setFormData({ firstName: '', lastName: '', email: '', department: '' });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.department) newErrors.department = 'Department is required';
    return newErrors;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // *** THE FIX IS HERE ***
      // initialData comes first to preserve the ID, 
      // then formData overwrites the edited fields.
      onSubmit({ ...initialData, ...formData });
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <h2>{initialData ? 'Edit User' : 'Add User'}</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>First Name</Label>
            <Input name="firstName" value={formData.firstName} onChange={handleChange} />
            {errors.firstName && <p style={{color: 'red'}}>{errors.firstName}</p>}
          </FormGroup>
          <FormGroup>
            <Label>Last Name</Label>
            <Input name="lastName" value={formData.lastName} onChange={handleChange} />
            {errors.lastName && <p style={{color: 'red'}}>{errors.lastName}</p>}
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
          </FormGroup>
          <FormGroup>
            <Label>Department</Label>
            <Input name="department" value={formData.department} onChange={handleChange} />
            {errors.department && <p style={{color: 'red'}}>{errors.department}</p>}
          </FormGroup>
          <SubmitButton type="submit">{initialData ? 'Update User' : 'Create User'}</SubmitButton>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default UserFormModal;