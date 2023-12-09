import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NotePage = () => {
  const [personality, setPersonality] = useState('');
  const [matchingNotes, setMatchingNotes] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [access_token, setAccessToken] = useState('');

  const getStoredAccessToken = async () => {
    return localStorage.getItem('access_token');
  };

  const handleGetNotes = async () => {
    try {
      // Call your /notes endpoint with the personality input
      const storedAccessToken = await getStoredAccessToken();
      console.log('Stored Access Token:', storedAccessToken);
      if (!storedAccessToken) {
        console.error('Access token not found');
        return;
      }

      setAccessToken(storedAccessToken);
      console.log(access_token);
      const response = await axios.get('http://40.119.225.7/notes', {
      headers: {
        Authorization: `Bearer ` + storedAccessToken,
        "Content-Type": 'application/json',
        Accept: 'application/json'
      },
      params: {
        personality: personality,
      },
    });
      
    const { code, messages, "matching notes": matchingNotes, data } = response.data;

      if (code === 200) {
        setMatchingNotes(matchingNotes);
        setRecommendations(data.recommendations);
        console.log(data);
      }
    } catch (error) {
      console.log(access_token);
      console.error('Failed to get notes:', error.message);
      if (error.message === "Request failed with status code 404") {
        setMatchingNotes("Personality not found");
      }
      // Handle the error, e.g., display an error message to the user
    }
  };

  return (
    <div>
      <h2>Enter Your Personality</h2>
      <label>
        Personality:
        <input
          type="text"
          value={personality}
          onChange={(e) => setPersonality(e.target.value)}
        />
      </label>
      <br />
      <button type="button" onClick={handleGetNotes}>
        Get Matching Perfumes
      </button>

      {/* Display matching notes and recommendations */}
      {matchingNotes && (
        <div>
          {matchingNotes === "Personality not found" ? (
            <h3>{matchingNotes}</h3>
          ) : (
            <>
              <h3>Matching Notes: {matchingNotes}</h3>
              <h3>Recommendations:</h3>
              <ul>
                {recommendations.map((perfume) => (
                  <li key={perfume.Name}>
                    <strong>{perfume.Name}</strong> - {perfume.Brand}
                    <p>{perfume.Notes}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NotePage;
