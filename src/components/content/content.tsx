import { globalPagesStyle } from '@/helpers/styles/global-page.style';
import React from 'react';

interface IPageContent {
  children: any;
}
function PageContent({ children }: IPageContent) {
  return (
    <div className="relative bg-sidebar h-screen min-h-[100%]">{children}</div>
  );
}

export default PageContent;
