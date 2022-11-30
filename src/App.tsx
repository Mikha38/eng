
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopMenu from './Components/TopMenu/TopMenu';
import Groups from './Components/Groups/Groups';
import Grammar from "./Components/Grammar/Grammar";
import Texts from "./Components/Texts/Texts";
import MethodMenu from "./Components/MethodMenu/MethodMenu";
import English from "./Components/Methods/English/English";
import Russian from "./Components/Methods/Russian/Russian";
import Spelling from "./Components/Methods/Spelling/Spelling";
import Auding from "./Components/Methods/Auding/Auding";
import { useGetGroupsQuery } from './app/API/groupsAPI';
import React, { useEffect } from 'react';
import Footer from './Components/Footer/Footer';
import AdminMenu from './AdminComponents/AdminMenu/AdminMenu';
import AdminWords from './AdminComponents/AdminWords/AdminWords';
import AdminGroups from './AdminComponents/AdminGroups/AdminGroups';
import BreadCrumb from './Components/BreadCrumbp/BreadCrumb';
import Auth from './Components/Auth/Auth';
import { useAppDispatch, useAppSelector } from './app/hooks/hooks';
import { loginByRefreshThunk } from './app/API/userAPI';
import { RootState } from './app/store';

function App() {
    useEffect(()=>{
        dispatch(loginByRefreshThunk())
        document.cookie = encodeURIComponent('name222') + '=' + encodeURIComponent('Mike');
        console.log(document.cookie)
    }, [])
    const dispatch = useAppDispatch()
    const {data: groups = [], isSuccess} = useGetGroupsQuery()
    const { id: userId } = useAppSelector((state: RootState) => state.userData)
    const admin = userId === 1 //Вывести роли в глобальный стейт
    return (
        <div className='container mx-auto px-4 py-4 max-w-7xl'>
            <Router>
                <AdminMenu />
                <TopMenu />
                <BreadCrumb />
                <Routes>
                    {admin && <Route path="/adminWords" element={<AdminWords />} />}
                    {admin && <Route path="/adminGroups" element={<AdminGroups />} />}
                    
                    <Route path="/" element={<Groups />} />
                    <Route path="/authorization" element={<Auth />} />
                    <Route path="/grammar" element={<Grammar />} />
                    <Route path="/texts" element={<Texts />} />
                    {isSuccess && groups.map((el: any, i: number) => {
                        return (
                            <React.Fragment key={i}>
                                <Route path={`/${el.title}`} element={<MethodMenu {...el} />} />

                                <Route path={`/${el.title}/english`} element={<English {...el} />} />
                                <Route path={`/${el.title}/russian`} element={<Russian {...el} />} />
                                <Route path={`/${el.title}/spelling`} element={<Spelling {...el} />} />
                                <Route path={`/${el.title}/auding`} element={<Auding {...el} />} />
                            </React.Fragment>
                        )
                    })}
                    <Route path="/MethodMenu" element={<MethodMenu />} />
                </Routes>
            </Router>
            <Footer />
        </div>
  )
}

export default App;
