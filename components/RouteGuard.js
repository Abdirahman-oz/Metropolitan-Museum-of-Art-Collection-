import { useState, useEffect,useCallback } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '@/lib/authenticate';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';
import { useAtom } from "jotai";

const PUBLIC_PATHS = ['/login', '/', '/register', '/_error'];

export default function RouteGuard(props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)

  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)


//kept getting missing dependency warning when using useEffect React Hook
// so https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
//recommended me  useCallback  
  const authCheck = useCallback((url) => {
    // redirect to login page if accessing a private page and not logged in 
    const path = url.split('?')[0];
    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);
  
  const updateAtoms = useCallback(async () => {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }, [setFavouritesList, setSearchHistory]);
  
  useEffect(() => {
    updateAtoms()
    // on initial load - run auth check 
    authCheck(router.pathname);
    const handleRouteChange = (url) => {
      authCheck(url);
      updateAtoms();
    };
    // on route change complete - run auth check 
    router.events.on('routeChangeComplete', handleRouteChange)
  
    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    }
  
  }, [authCheck, router.events, router.pathname, updateAtoms]);
  
  return (
    <>
      {authorized && props.children}
    </>
  )
}