import { Layout } from 'antd';
const { Footer } = Layout;

const AdminFooter = () => {
    return (
        <Footer style={{ textAlign: 'center' }}>
           My Ticket App - ©{new Date().getFullYear()}
        </Footer>
    );
};
export default AdminFooter;