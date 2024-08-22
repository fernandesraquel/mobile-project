import RootNavigator from './src/navigation'
import { AuthProvider } from './src/contexts/AuthContext'

const App = () => {
  return (
    <AuthProvider>
      <RootNavigator/>
    </AuthProvider>
    
  );
}

export default App;

