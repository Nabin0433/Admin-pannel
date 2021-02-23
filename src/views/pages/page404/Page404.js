import React from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupAppend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Error404 from './Error404'

const Page404 = () => {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <Error404 style={{position:"fixed",width:'100vw',height:'100vh',zIndex:'-1'}} />
      <CContainer style={{position:"fixed",width:'100vw',height:'100vh',zIndex:'11',top:'70%'}}>
        <CRow  className="justify-content-center">
          <CCol md="6">
            <div className="clearfix">
              <h1 className="float-left display-3 mr-4">404</h1>
              <h4 className="pt-3">Oops! You{'\''}re lost.</h4>
              <p className="text-muted float-left">The page you are looking for was not found.</p>
            </div>
            <CInputGroup className="input-prepend">
              <CInputGroupPrepend>
                <CInputGroupText>
                  <CIcon name="cil-magnifying-glass" />
                </CInputGroupText>
              </CInputGroupPrepend>
              <CInput size="16" type="text" placeholder="What are you looking for?" />
              <CInputGroupAppend>
                <CButton color="info">Search</CButton>
              </CInputGroupAppend>
            </CInputGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page404;
