import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { SignIn } from './components/SignIn'
import { RecoilRoot } from 'recoil'
import { LogIn } from './components/Login'

function App() {
    return (
        <div>
            <RecoilRoot>
                <BrowserRouter>
                    <Routes>
                        <Route path="/auth/register" Component={SignIn}></Route>
                        <Route path="/auth/login" Component={LogIn}></Route>
                    </Routes>
                </BrowserRouter>
            </RecoilRoot>
        </div>
    )
}

export default App
