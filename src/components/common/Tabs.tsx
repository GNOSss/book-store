import React, { useState } from 'react';
import styled from 'styled-components';

interface TabProps {
  title: string; // 목차
  children: React.ReactNode; // 내용
}

const Tab = ({ children }: TabProps) => {
  return <>{children}</>;
};

interface TabsProps {
  children: React.ReactNode; // Tab컴포넌트
}

const Tabs = ({ children }: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // React.Children.toArray(children) : children을 액세스할 수 있는 배열로 만든다.
  // children은 일관된 배열이 아닐 수 있기 때문
  const tabs = React.Children.toArray(children) as React.ReactElement<TabProps>[];
  console.log('tabs', tabs);

  return (
    <TabsStyle>
      <div className="tab-header">
        {tabs.map((tab, index) => (
          <button onClick={() => setActiveIndex(index)} className={activeIndex === index ? 'active' : ''}>
            {tab.props.title}
          </button>
        ))}
      </div>
      <div className="tab-content">{tabs[activeIndex]}</div>
    </TabsStyle>
  );
};

const TabsStyle = styled.div`
  .tab-header {
    display: flex;
    gap: 2px;
    border-bottom: 1px solid #ddd;

    button {
      border: none;
      background: #ddd;
      cursor: pointer;
      font-size: 1.25rem;
      font-weight: bold;
      color: ${({ theme }) => theme.color.text};
      border-radius: ${({ theme }) => theme.borderRadius.default} ${({ theme }) => theme.borderRadius.default} 0 0;
      padding: 12px;

      &.active {
        color: #fff;
        background: ${({ theme }) => theme.color.primary};
      }
    }
  }

  .tab-content {
    padding: 24px 0;
  }
`;

export { Tab, Tabs };
