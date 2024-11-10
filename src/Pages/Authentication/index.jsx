import { Drawer, Tabs } from "antd"
import Login from "./Login";
import Register from "./Register";
import { useState } from "react";

const Authentication = ({open, setOpen}) => {

  const [activeTab, setActiveTab] = useState("1");

    const items = [
        {
          key: '1',
          label: 'Sign in',
          children: <Login setOpen={setOpen} />,
        },
        {
          key: '2',
          label: 'Register',
          children: <Register setActiveTab={setActiveTab} />,
        },

    ];
  return (
    <Drawer
      style={{ border: 'none', zIndex: 1000, padding: 0 }}
      title={null}
      placement={'right'}
      closable={false}
      onClose={() => setOpen(false)}
      open={open}
      key={'left'}
      className="rest-drawer relative w-full"
      width={window.innerWidth > 1200 ? 300 : 'auto'}
    >
        <Tabs  items={items} centered size="large" className="!p-0" activeKey={activeTab} onChange={(key) => setActiveTab(key)} />
    </Drawer>
  )
}

export default Authentication