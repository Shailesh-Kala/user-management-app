import { Alert, CircularProgress, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function App() {
  const [status, setStatus] = useState<'loading' | 'up' | 'down'>('loading');

  useEffect(() => {
    fetch('/api/health')
      .then((r) => setStatus(r.ok ? 'up' : 'down'))
      .catch(() => setStatus('down'));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>User Management</Typography>
      {status === 'loading' && <CircularProgress />}
      {status === 'up' && <Alert severity="success">API and database are up</Alert>}
      {status === 'down' && <Alert severity="error">API or database is down</Alert>}
    </Container>
  );
}
