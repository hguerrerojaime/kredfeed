import { useState } from 'react'
import UserDetail from './components/UserDetail'
import CreateUser from './components/CreateUser'
import { Card, Input, Space } from 'antd'
import './App.css';

const { Search } = Input

function App() {

  const [id, setId] = useState<string>('');

  let userDetailComponent = null

  if (id) {
    userDetailComponent = <UserDetail id={id} />
  }

  return (
    <div className="App">
      <header className="App-header">
        KreedFeed
      </header>
      <div>
        <Card>
          <Search placeholder='user id' onSearch={(e) => setId(e)} />
          { userDetailComponent }
        </Card>
      </div>
      <Space />
      <div>
        <CreateUser />
      </div>
    </div>
  );
}

export default App;
