import db from './database.js';

export function setupRoutes(app) {
// Endpoint to handle profile updates
  app.post('/update-profile', (req, res) => {
    const { newProfileName } = req.body;

    // Example: Assuming you have a table called 'profiles' with a column 'username'
    // and you're updating the profile based on the logged-in user's ID
    const loggedInUserId = 1; // Replace this with the actual logged-in user's ID

    // Update profile in database
    db.run('UPDATE profiles SET username = ? WHERE id = ?', [newProfileName, loggedInUserId], (err) => {
      if (err) {
        console.error('Error updating profile:', err);
        return res.status(500).json({ error: 'Failed to update profile' });
      }
      res.status(200).json({ message: 'Profile updated successfully' });
    });
  });

  // Endpoint to get the current profile
  app.get('/get-profile', (req, res) => {
    const loggedInUserId = 1; // Replace this with the actual logged-in user's ID
    db.get('SELECT username FROM profiles WHERE id = ?', [loggedInUserId], (err, row) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).json({ error: 'Failed to get profile' });
      }
      if (!row || !row.username) {
        console.error('Profile not found for user ID:', loggedInUserId);
        return res.status(404).json({ error: 'Profile not found' });
      }
      console.log('Profile found:', row.username);
      res.status(200).json({ username: row.username });
    });
  });
}
