import React from 'react';
import {
  Location,
  Outlet,
  ScrollRestoration,
  useMatches,
} from 'react-router-dom';

import { Header, Footer } from '../../components';
import { ScrollToTop } from '../../utils/ScrollToTop';

export const MainLayout: React.FC = () => {
  let getKey = React.useCallback(
    (location: Location, matches: ReturnType<typeof useMatches>) => {
      let match = matches.find((m) => (m.handle as any)?.scrollMode);
      if ((match?.handle as any)?.scrollMode === 'pathname') {
        return location.pathname;
      }

      return location.key;
    },
    []
  );
  return (
    <>
      <ScrollToTop />
      <div className="wrapper">
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </div>
      <Footer />
      {/* <ScrollRestoration
        getKey={(location, matches) => {
          return location.pathname;
        }}
      /> */}
    </>
  );
};
