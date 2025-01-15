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

const inputTextStyles = {
  width: '100%',
  backgroundColor: 'white',
  color: 'black',
};

const inputTextPlaceholderStyles = {
  '&::placeholder': {
    color: '#ccc',
  },
};

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
    setUploading(false); // Ensure the button stops glowing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      setShowTooltip(true);
      return;
    }

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
      const response = await fetch('http://3.142.196.183:5000/submit-quote', {
        method: 'POST',
        body: formDataToSend
      });      

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
      style={{ width: isMobile ? '90vw' : '50vw', maxWidth: '1000px', maxHeight: '1200px' }}
      breakpoints={{ '960px': '75vw', '640px': '90vw' }}
      header="Request a 3D Printing Quote"
      headerStyle={{ backgroundColor: '#FF5722', color: 'white' }}
      contentStyle={{ backgroundColor: '#424242', padding: '2rem', maxHeight: '60vh', overflowY: 'auto' }}
    >
      <form onSubmit={handleSubmit} className="p-fluid" style={{ width: '100%' }}>
        <div className="p-field" style={{ marginBottom: '1rem' }}>
          <label htmlFor="name" style={{ color: 'white' }}>
            Name: <span style={{ color: 'red' }}>*</span>
          </label>
          <InputText
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
            style={{ ...inputTextStyles, ...inputTextPlaceholderStyles }}
            className="custom-placeholder p-inputtext-custom-placeholder"
          />
        </div>
        <div className="p-field" style={{ marginBottom: '1rem' }}>
          <label htmlFor="email" style={{ color: 'white' }}>
            Email: <span style={{ color: 'red' }}>*</span>
          </label>
          <InputText
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="valley3dprints@gmail.com"
            type="email"
            style={{ ...inputTextStyles, ...inputTextPlaceholderStyles }}
            className="custom-placeholder"
          />
        </div>
        <div className="p-field" style={{ marginBottom: '1rem' }}>
          <label htmlFor="phone" style={{ color: 'white' }}>Phone Number: 
          <span style={{ color: 'red' }}> *</span> </label>
          <InputText
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(209) 202 - 3221"
            type="tel"
            required
            style={{ ...inputTextStyles, ...inputTextPlaceholderStyles }}
            className="custom-placeholder"
          />
          {phoneError && <small style={{ color: 'red' }}>{phoneError}</small>}
        </div>
        <div className="p-field" style={{ marginBottom: '1rem' }}>
          <label htmlFor="description" style={{ color: 'white' }}>
            Description:  <span style={{ color: 'red' }}>*</span>
          </label>
          <InputTextarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Describe your request in as much detail as necessary and provide measurements if available"
            style={{ ...inputTextStyles, ...inputTextPlaceholderStyles }}
            className="custom-placeholder"
          />
        </div>
        <div className="p-field" style={{ marginBottom: '1rem' }}>
          <label htmlFor="link" style={{ color: 'white' }}>Provide a Link:</label>
          <InputText
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://thingiverse.com/thing:1234567"
            style={{ ...inputTextStyles, ...inputTextPlaceholderStyles }}
            className="custom-placeholder"
          />
        </div>
        <div className="p-field" style={{ marginBottom: '1rem' }}>
          <label htmlFor="fileUpload" style={{ color: 'white' }}>Upload File:</label>
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
            chooseOptions={{ className: 'p-button-warning', style: { backgroundColor: '#FF5722', borderColor: '#FF5722' } }}
            uploadLabel="Upload"
            uploadOptions={{
              className: `p-button-success ${files.length > 0 && !uploading ? 'glow-border' : ''}`,
              style: { backgroundColor: '#4CAF50', borderColor: '#4CAF50' }
            }}
            cancelLabel="Clear"
            cancelOptions={{ className: 'p-button-danger', style: { backgroundColor: 'red', borderColor: 'red' } }}
            style={{ backgroundColor: '#424242', color: 'white' }}
            className="custom-fileupload"
          />
          <style>
            {`
              @keyframes pulse {
                0% {
                  box-shadow: 0 0 5px #4CAF50, 0 0 10px #4CAF50, 0 0 20px #4CAF50, 0 0 30px #4CAF50;
                }
                50% {
                  box-shadow: 0 0 5px #4CAF50, 0 0 10px #4CAF50, 0 0 20px #4CAF50, 0 0 30px transparent;
                }
                100% {
                  box-shadow: 0 0 5px #4CAF50, 0 0 10px #4CAF50, 0 0 20px #4CAF50, 0 0 30px #4CAF50;
                }
              }

              .glow-border {
                animation: pulse 1.5s infinite;
              }
            `}
          </style>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10px', marginBottom: '15px' }}>
          <p style={{ color: 'white', fontSize: '0.675rem' }}>Click "Clear" to clear your selected file(s)</p>
        </div>
        <div className="p-field-checkbox" style={{ marginBottom: '1rem' }}>
          <Button
            type="button"
            className="p-button-text p-button-outlined"
            onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
            style={{
              color: 'white',
              borderColor: 'white',
              maxWidth: '300px',
              backgroundColor: '#FF5722',
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
              margin: '0 auto',
            }}
            aria-expanded={showAdvancedOptions}
            aria-controls="advanced-options"
          >
            {showAdvancedOptions ? 'Hide Advanced Options' : 'Show Advanced Options'}
            <ExpandMoreIcon style={{ marginLeft: '0.5rem' }} />
          </Button>
        </div>
        <Collapse in={showAdvancedOptions}>
          <div id="advanced-options">
            <div className="p-field-checkbox" style={{ marginBottom: '1rem', color: 'white', display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                id="noSupports"
                name="noSupports"
                checked={formData.noSupports}
                onChange={handleChange}
                className="p-checkbox"
                style={{ marginRight: '0.5rem' }}
              />
              <label htmlFor="noSupports" className="p-checkbox-label" style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                No Supports
                <Tooltip title="Does your print require no supports? Check this box." arrow>
                  <HelpOutlineOutlinedIcon fontSize="small" style={{ color: 'orange', marginLeft: '0.25rem', verticalAlign: 'middle', fontSize: '2em' }} />
                </Tooltip>
              </label>
            </div>
            <div className="p-field" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
              <label htmlFor="material" style={{ color: 'white', marginRight: '0.5rem', minWidth: '60px' }}>Material</label>
              <Dropdown
                id="material"
                name="material"
                value={formData.material}
                options={materials}
                onChange={handleDropdownChange}
                placeholder="Select a material"
                optionLabel="label"
                style={{ width: '300px', backgroundColor: 'white', color: 'black' }}
              />
              <Tooltip title="The type of 'filament' material you'd like to use. PLA is Default." arrow>
                <HelpOutlineOutlinedIcon fontSize="small" style={{ color: 'orange', marginLeft: '0.25rem', fontSize: '2em' }} />
              </Tooltip>
            </div>
            <div className="p-field" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
              <label htmlFor="priority" style={{ color: 'white', marginRight: '0.5rem', minWidth: '60px' }}>Priority</label>
              <Dropdown
                id="priority"
                name="priority"
                value={formData.priority}
                options={priorityOptions}
                onChange={handleDropdownChange}
                placeholder="Select a priority"
                optionLabel="label"
                style={{ width: '300px', backgroundColor: 'white', color: 'black' }}
              />
              <Tooltip title="Select the priority level for your request." arrow>
                <HelpOutlineOutlinedIcon fontSize="small" style={{ color: 'orange', marginLeft: '0.25rem', fontSize: '2rem' }} />
              </Tooltip>
            </div>
          </div>
        </Collapse>
        <div className="p-field" style={{ textAlign: 'right', marginTop: '1rem' }}>
        <Tooltip title="Please fill out all required fields before submitting" open={showTooltip}>
          <span>
            <Button
              type="submit"
              label="Submit"
              className="p-button-success"
              style={{ marginRight: '0.5rem', width: 'auto', minWidth: '120px' }}
            />
          </span>
        </Tooltip>
          <Button
            type="button"
            label="Close"
            className="p-button-secondary p-button-danger"
            onClick={onClose}
            style={{ width: 'auto', minWidth: '80px' }}
          />
        </div>
      </form>
    </Dialog>
  );
};

export default QuoteForm;
