import { HeaderLayout } from '../header-layout/header-layout';

export const Header = async () => {
  return (
    <HeaderLayout
      logo={<div style={{ backgroundColor: '#ccc' }}>Лого</div>}
      contacts={<div style={{ backgroundColor: '#ccc' }}>Контакты</div>}
      userActions={<div style={{ backgroundColor: '#ccc' }}>Actions</div>}
      catalog={<div style={{ backgroundColor: '#ccc' }}>Каталог</div>}
      infoMenu={<div style={{ backgroundColor: '#ccc' }}>Инфо-меню</div>}
      authStatus={<div style={{ backgroundColor: '#ccc' }}>Auth</div>}
    />
  );
};
