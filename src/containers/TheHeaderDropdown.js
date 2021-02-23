import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import CreateIcon from '@material-ui/icons/Create';
import { useHistory } from 'react-router-dom';



const TheHeaderDropdown = () => {

  const history = useHistory();
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={'https://th.bing.com/th/id/OIF.WREm3pqUiJRS6HMGOgQRBA?pid=ImgDet&rs=1'}
            className="c-avatar-img"
            alt="Avarar Icon"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem onClick={() => history.push('/register')}>
         <CreateIcon style={{marginRight:"7px"}} />
          Register
          <CBadge color="info" className="mfs-auto">New</CBadge>
        </CDropdownItem>
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
        <strong>Settings</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />Profile
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-credit-card" className="mfe-2" />
          Payments
          <CBadge color="secondary" className="mfs-auto">90</CBadge>
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Logout Admin
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
