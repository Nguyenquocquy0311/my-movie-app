import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { authentication } from '../lib/firebase'
import { useCallback, useEffect, useState } from 'react'

import {
  fetchAndActivate,
  getRemoteConfig,
  getValue,
} from 'firebase/remote-config'
import { firebaseApp } from '../lib/firebase'
import { createContainer } from 'unstated-next'


function useAuth() {
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState(null)

  const [isLoadingGoogleLogin, setIsLoadingGoogleLogin] = useState(false)
  const [isLoadingFbLogin, setIsLoadingFbLogin] = useState(false)
  const [isLoadingAppleLogin, setIsLoadingAppleLogin] = useState(false)

  const loginWithGoogle = async () => {
    setIsLoadingGoogleLogin(true)
    const provider = new GoogleAuthProvider()

    try {
      const res = await signInWithPopup(authentication, provider)
      if (res) {
        // setUserInfo(res?.user)
        localStorage.setItem(
          'user-info',
          JSON.stringify(res?.user)
        )
      }
      setIsLoadingGoogleLogin(false)
      return res
    } catch (e) {
      setIsLoadingGoogleLogin(false)
      throw e
    }
  }

  const loginWithFacebook = async () => {
    setIsLoadingFbLogin(true)
    const provider = new FacebookAuthProvider()

    try {
      const res = await signInWithPopup(authentication, provider)
      if (res) {
        // setUserInfo(res?.user)
        localStorage.setItem(
          'user-info',
          JSON.stringify(res?.user)
        )
      }
      setIsLoadingFbLogin(false)
      return res
    } catch (e) {
      setIsLoadingFbLogin(false)
      throw e
    }
  }


  const logout = () => {
    signOut(authentication).then(() => {
      setUserInfo(null)
      localStorage.removeItem('user-info')
    })
  }

  const refreshToken = useCallback(() => {
    setLoading(true)
    // @ts-ignore
    getUserInfo(authentication?.currentUser?.accessToken).then((res) => {
      if (!res?.subscriber) {
        setTimeout(() => {
          refreshToken()
        }, 1000)
      }
    })
  }, [])

  useEffect(() => {
    if (!userInfo) {
      const cachedUserInfo = localStorage.getItem(
        'user-info'
      )
      if (cachedUserInfo) setUserInfo(JSON.parse(cachedUserInfo))
    }
  }, [userInfo])

  const fetchAndActiveRemoteConfig = useCallback(async () => {
    const remoteConfig = getRemoteConfig(firebaseApp)
    remoteConfig.settings = {
      minimumFetchIntervalMillis: 3600000,
      fetchTimeoutMillis: 5000,
    }

    try {
      await fetchAndActivate(remoteConfig)
      const watermarkConfig = getValue(remoteConfig, 'watermark')
      // @ts-ignore
      if (watermarkConfig?._value) setWatermarkConfig(JSON.parse(watermarkConfig?._value))
    } catch (error) {
      console.log('error: ', error)
    }
  }, [])

  return {
    loading,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    isLoadingGoogleLogin,
    isLoadingFbLogin,
    isLoadingAppleLogin,
    sendSignInLinkToEmail,
    userInfo,
    refreshToken,
  }
}

const Auth = createContainer(useAuth)

export default Auth
