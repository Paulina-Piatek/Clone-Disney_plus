import React, { useEffect } from 'react'
import { findRenderedComponentWithType} from 'react-dom/test-utils'
import styled from 'styled-components'
import { auth, provider } from "../firebase"
import { useNavigate } from "react-router-dom";
import {
  selectUserName,
  selectUserPhoto,
  setUserLogin,
  setSignOut
} from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux"

function Header() {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const history = useNavigate(); 

  useEffect(() => {
    auth.onAuthStateChanged(async(user)=>{
      if(user) {
        dispatch(
          setUserLogin({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL
        }))
        history.push("/")
      }
    })
  })

  const signIn = () => 
  {
      auth.signInWithPopup(provider)
      .then((result)=>{
        let user = result.user
        dispatch(setUserLogin({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL
        }))
        history.push("/")
      });
  }
  const signOut = () => 
  {
      auth.signOut()
      .then(()=>{
        dispatch(setSignOut());
        history.push("/login");
      })
  }
  return (
    <Nav>
      <Logo src="/images/logo.svg" />
      { !userName ? (
          <LoginContainer>
              
              <Login onClick={signIn}>Login</Login>
          </LoginContainer> ):
          <>
            <NavMenu>
          <a>
            <img src="/images/home-icon.svg" />
            <span>HOME</span>
          </a>
          <a>
            <img src="/images/search-icon.svg" />
            <span>SEARCH</span>
          </a>
          <a>
            <img src="/images/watchlist-icon.svg" />
            <span>WATCHLIST</span>
          </a>
          <a>
            <img src="/images/original-icon.svg" />
            <span>ORIGINALS</span>
          </a>
          <a>
            <img src="/images/movie-icon.svg" />
            <span>MOVIES</span>
          </a>
          <a>
            <img src="/images/series-icon.svg" />
            <span>SERIES</span>
          </a>
      </NavMenu>
      <UserImg  onClick={signOut} src={userPhoto} />
          </>
      }
      
    </Nav>
  )    
}

export default Header
const Nav = styled.nav`
height: 70px;
background:#090b13;
display: flex;
align-items: center;
padding: 0 36px;
overflow-x: hidden;
`
const Logo = styled.img`
width: 80px;`

const  NavMenu = styled.div`
 align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;
  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }
    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;
      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }
    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }
  /* @media (max-width: 768px) {
    display: none;
  } */
`

const UserImg = styled.img`
width: 40px;
height:40px;
border-radius:50%;
cursor: pointer;
`
const Login = styled.a`
 background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`
const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`