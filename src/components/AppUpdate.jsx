
// src/components/AppVersionChecker.jsx

import  { useEffect, useState, useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Adjust path as necessary
import Swal from 'sweetalert2';

const AppUpdate = () => {
  // Define the current application ID.
  // This should match the 'appId' field in your 'apps_versions' Firestore collection.
  const currentAppId = "1";

  // Firestore collection reference
  const appRef = collection(db, 'app_versions');

  // State to hold fetched app data (though not strictly necessary for this component's primary function)
  const [apps, setApps] = useState([]); // Consider if you truly need this state in this component

  // Memoized function to get stored versions from localStorage
  const getStoredVersions = useCallback(() => {
    const stored = localStorage.getItem('app_versions');
    return stored ? JSON.parse(stored) : {};
  }, []); // No dependencies, so it's stable

  // Memoized function to save new versions to localStorage
  const saveVersionsToStorage = useCallback((versionMap) => {
    localStorage.setItem('app_versions', JSON.stringify(versionMap));
  }, []); // No dependencies, so it's stable

  // Main function to fetch app versions and check for updates
  // showAlertOnChange: boolean to control whether to show the Swal alert
  const fetchApps = useCallback(async (showAlertOnChange = false) => {
    try {
      const data = await getDocs(appRef);
      const fetchedApps = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Find the version information for the current application
      const currentApp = fetchedApps.find((app) => app.appId === currentAppId);

      // If currentApp is not found in Firestore, something is misconfigured or data is missing.
      // Log an error and return.
      if (!currentApp) {
        console.error(`App ID "${currentAppId}" not found in Firestore 'apps_versions' collection.`);
        return;
      }

      const storedVersions = getStoredVersions();
      const prevVersion = storedVersions[currentAppId]; // Get the version stored from previous session

      // Check if there's a version change and if we should alert the user
      if (showAlertOnChange && prevVersion && prevVersion !== currentApp.version) {

        // alert('ok')
        Swal.fire({
          title: `This site has a new update by the Developer!`,
          text: `Kindly click the 'UPDATE" button to catch up`,
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Update',
          cancelButtonText: 'Remind me later',
          allowOutsideClick: false, // Prevent closing by clicking outside
          allowEscapeKey: false,   // Prevent closing with ESC key
        }).then((result) => {
          if (result.isConfirmed) {
            // User confirmed update: Save new version and reload
            const versionMap = { ...storedVersions, [currentAppId]: currentApp.version };
            saveVersionsToStorage(versionMap);
            window.location.reload(); // Force a full page reload to get the latest code
          }
          // If user cancels, the stored version remains the old one, so they'll be reminded later.
          // No action needed here if result.isDismissed
        });
      } else {
        // No version change, first-time load, or alert not requested:
        // Just save the current version to localStorage.
        const versionMap = { ...storedVersions, [currentAppId]: currentApp.version };
        saveVersionsToStorage(versionMap);
      }

      // Update component state (optional for this component's core functionality)
      setApps(fetchedApps);

    } catch (error) {
      console.error("Error fetching app versions:", error);
      // Optionally show a silent error or log to a monitoring service
    }
  }, [currentAppId, appRef, getStoredVersions, saveVersionsToStorage]); // Dependencies for useCallback

  // Effect to run the version check on mount and then periodically
  useEffect(() => {
    fetchApps(true); // Check immediately on mount and show alert if needed

    // Set up interval for periodic checks (every 5 minutes)
    const interval = setInterval(() => fetchApps(true), 3 * 60 * 1000); // 5 minutes

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // `fetchApps` is a dependency because it's used inside useEffect

  // This component doesn't render any UI directly; it performs background logic.
  // It will render null.
  return null;
};

export default AppUpdate;