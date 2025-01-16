import React, { useState, useRef, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { Box, useMediaQuery, useTheme, Collapse } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './QuoteForm.module.css';

const QuoteForm = ({ isVisible, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    material: '',
    link: '',
    noSupports: false,
    priority: ''
  });
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileUploadRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const materials = [
    { label: 'PLA (Default)', value: 'PLA' },
    { label: '---- Premium Options ----', value: '', disabled: true },
    { label: 'PETG', value: 'PETG' },
    { label: 'TPU', value: 'TPU' }
  ];

  const priorityOptions = [
    { label: 'No Priority (Default)', value: '' },
    { label: 'Average: 1 - 2 Weeks', value: 'average' },
    { label: 'Relaxed: 2 - 4 Weeks', value: 'relaxed' },
    { label: 'Urgent: Couple Days (Premium)', value: 'urgent' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    if (name === 'phone') {
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue.length <= 11) {
        setFormData({ ...formData, [name]: numericValue });
        setPhoneError('');
      } else {
        setPhoneError('Phone number cannot exceed 11 digits.');
      }
    } else {
      setFormData({ ...formData, [name]: val });
    }
  };

  const handleDropdownChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpload = ({ files }) => {
    setFiles(files);
    setUploading(true);
  };

  const handleSelect = ({ files }) => {
    setFiles(files);
    setUploading(false);
  };

  const handleClear = () => {
    setFiles([]);
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid || isSubmitting) {
      setShowTooltip(true);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('material', formData.material);
    formDataToSend.append('link', formData.link);
    formDataToSend.append('noSupports', formData.noSupports);
    formDataToSend.append('priority', formData.priority);

    files.forEach(file => {
      formDataToSend.append('files[]', file);
    });

    try {
      const response = await fetch('https://threedprintingwebsite.onrender.com/submit-quote', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error('Failed to submit. Please check your internet connection or try again later.');
      }

      const result = await response.text();
      alert(result);

      setFormData({
        name: '',
        email: '',
        phone: '',
        description: '',
        material: 'PLA',
        link: '',
        noSupports: false,
        priority: ''
      });
      setFiles([]);
      onClose();
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const isValid = formData.name && formData.email && formData.description && !phoneError;
    setIsFormValid(isValid);
  }, [formData, phoneError]);

  return (
    <Dialog
      visible={isVisible}
      onHide={onClose}
      className={styles.dialog}
      header="Request a 3D Printing Quote"
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        <div className={styles.fieldGroup}>
          <label htmlFor="name">
            Name: <span className={styles.required}>*</span>
          </label>
          <InputText
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
            className={styles.input}
          />
        </div>
        <div className={styles.fieldGroup}>
          <label htmlFor="email">
            Email: <span className={styles.required}>*</span>
          </label>
          <InputText
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="valley3dprints@gmail.com"
            className={styles.input}
          />
        </div>
        <div className={styles.fieldGroup}>
          <label htmlFor="phone">
            Phone Number: <span className={styles.required}>*</span>
          </label>
          <InputText
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="(209) 202 - 3221"
            className={styles.input}
          />
          {phoneError && <small className={styles.error}>{phoneError}</small>}
        </div>
        <div className={styles.fieldGroup}>
          <label htmlFor="description">
            Description: <span className={styles.required}>*</span>
          </label>
          <InputTextarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Describe your request in detail..."
            className={styles.textarea}
          />
        </div>
        <div className={styles.fieldGroup}>
          <label htmlFor="material">Material:</label>
          <Dropdown
            id="material"
            name="material"
            value={formData.material}
            options={materials}
            onChange={handleDropdownChange}
            placeholder="Select a material"
            className={styles.dropdown}
          />
        </div>
        <div className={styles.fieldGroup}>
          <label htmlFor="priority">Priority:</label>
          <Dropdown
            id="priority"
            name="priority"
            value={formData.priority}
            options={priorityOptions}
            onChange={handleDropdownChange}
            placeholder="Select a priority"
            className={styles.dropdown}
          />
        </div>
        <div className={styles.fieldGroup}>
          <FileUpload
            id="fileUpload"
            name="files"
            multiple
            ref={fileUploadRef}
            onUpload={handleUpload}
            onSelect={handleSelect}
            onClear={handleClear}
            auto={false}
            chooseLabel="Choose"
            className={styles.fileUpload}
          />
        </div>
        <div className={styles.actions}>
          <Button
            type="submit"
            label={isSubmitting ? "Submitting..." : "Submit"}
            className="p-button-success"
            disabled={isSubmitting}
          />
          <Button
            type="button"
            label="Close"
            className="p-button-secondary p-button-danger"
            onClick={onClose}
          />
        </div>
      </form>
    </Dialog>
  );
};

export default QuoteForm;
