import { useState, useEffect,useCallback } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '@/lib/authenticate';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';
import { useAtom } from "jotai";

const PUBLIC_PATHS = ['/login', '/', '/_error', '/register'];

export default function RouteGuard(props) {
  const router = useRouter();
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  async function updateAtoms(){
    setFavourites(await getFavourites()); 
    setSearchHistory(await getHistory()); 
    }
    
  useEffect(() => {
    updateAtoms()
    // on initial load - run auth check
    authCheck(router.pathname);

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);

  function authCheck(url) {
    const path = url.split('?')[0];
    if (!PUBLIC_PATHS.includes(path)) {
      console.log(`trying to request a secure path: ${path}`);
    }
  }

  return <>{props.children}</>
}