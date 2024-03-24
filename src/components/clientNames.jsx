'use client'

import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';

const ClientAutoSuggest = ({ onSelectClient , user }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [clients, setClients] = useState([]);

  // Fetch client data from API endpoint
  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/clients?userId=${user.uid}`)
      .then(response => response.json())
      .then(data => {
        setClients(data);
      })
      .catch(error => console.error('Error fetching clients:', error));
  }, []);

  // Teach Autosuggest how to calculate suggestions for any given input value
  const getSuggestions = (inputValue) => {
    const inputValueLowerCase = inputValue.trim().toLowerCase();
    return clients.filter(client =>
      client.name.toLowerCase().includes(inputValueLowerCase)
    );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input field based on the clicked suggestion
  const onSuggestionSelected = (event, { suggestion }) => {
    onSelectClient(suggestion._id);
  };

  // Render suggestion
  const renderSuggestion = (suggestion) => (
    <div   className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
      {suggestion.name}
    </div>
  );

  // Autosuggest will call this function every time you need to update suggestions
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  // Autosuggest will call this function every time you need to clear suggestions
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Input field value change handler
  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  // Autosuggest input properties
  const inputProps = {
    className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400",
    placeholder: 'Type a client name',
    value,
    onChange,
  };

  return (
    <Autosuggest
   
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={(suggestion) => suggestion.name}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      onSuggestionSelected={onSuggestionSelected}
    />
  );
};

export default ClientAutoSuggest;
