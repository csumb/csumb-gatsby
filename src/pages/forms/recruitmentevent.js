import React from 'react'
import {
  Layout,
  SiteHeader,
  SiteNavigation,
  PageTitle,
} from '../../components/layouts/default'
import { graphql } from 'gatsby'
import Container from '../../components/common/container'

const inquiryForm = `
<!-- FORM: HEAD SECTION -->


<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <script type="text/javascript">
    document.addEventListener("DOMContentLoaded", function(){
        const FORM_TIME_START = Math.floor((new Date).getTime()/1000);
        let formElement = document.getElementById("tfa_0");
        if (null === formElement) {
            formElement = document.getElementById("0");
        }
        let appendJsTimerElement = function(){
            let formTimeDiff = Math.floor((new Date).getTime()/1000) - FORM_TIME_START;
            let cumulatedTimeElement = document.getElementById("tfa_dbCumulatedTime");
            if (null !== cumulatedTimeElement) {
                let cumulatedTime = parseInt(cumulatedTimeElement.value);
                if (null !== cumulatedTime && cumulatedTime > 0) {
                    formTimeDiff += cumulatedTime;
                }
            }
            let jsTimeInput = document.createElement("input");
            jsTimeInput.setAttribute("type", "hidden");
            jsTimeInput.setAttribute("value", formTimeDiff.toString());
            jsTimeInput.setAttribute("name", "tfa_dbElapsedJsTime");
            jsTimeInput.setAttribute("id", "tfa_dbElapsedJsTime");
            jsTimeInput.setAttribute("autocomplete", "off");
            if (null !== formElement) {
                formElement.appendChild(jsTimeInput);
            }
        };
        if (null !== formElement) {
            if(formElement.addEventListener){
                formElement.addEventListener('submit', appendJsTimerElement, false);
            } else if(formElement.attachEvent){
                formElement.attachEvent('onsubmit', appendJsTimerElement);
            }
        }
    });
</script>

<link href="https://csumb.tfaforms.net/dist/form-builder/5.0.0/wforms-layout.css?v=5110" rel="stylesheet" type="text/css" />

<link href="https://csumb.tfaforms.net/uploads/themes/theme-2.css" rel="stylesheet" type="text/css" />
<link href="https://csumb.tfaforms.net/dist/form-builder/5.0.0/wforms-jsonly.css?v=5110" rel="alternate stylesheet" title="This stylesheet activated by javascript" type="text/css" />
<script type="text/javascript" src="https://csumb.tfaforms.net/wForms/3.11/js/wforms.js?v=5110"></script>
<script type="text/javascript">
    wFORMS.behaviors.prefill.skip = false;
</script>
    <script type="text/javascript" src="https://csumb.tfaforms.net/wForms/3.11/js/localization-en_US.js?v=5110"></script>
    <style type="text/css">
    fieldset {
      border: none !important;
      padding: 0;
    }
    fieldset#tfa_324 {
      margin-bottom: 0;
    }
    #submit_button {
      border-radius: 0;
      display: inline-block;
      padding: 0.75rem;
      font-size: 1rem;
      text-decoration: none;
      cursor: pointer;
      border: none;
      color: white !important;
      background: #07633B;
    }
    .wForm {
      background: transparent !important;
    }
    .supportInfo {
      margin-top: 35px;
    }
    </style>

<!-- FORM: BODY SECTION -->
<div class="wFormContainer" style="margin: 0;" >
<style type="text/css"></style><div class=""><div style="padding: 0; margin: 0;" class="wForm" id="11-WRPR" dir="ltr">
<div class="codesection" id="code-11"></div>
<form method="post" action="https://csumb.tfaforms.net/responses/processor" class="hintsBelow labelsAbove" id="11" role="form">
<div class="htmlSection" id="tfa_346"><div class="htmlContent" id="tfa_346-HTML"><span style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small;"><i>Thanks for your interest in Cal State Monterey Bay! Please provide us with some basic details so we can send you information regarding our university, important admissions advice, and more.&nbsp;</i></span></div></div>
<fieldset id="tfa_324" class="section">
<legend id="tfa_324-L">What we need to know from you</legend>
<div class="oneField field-container-D    " id="tfa_1-D">
<label id="tfa_1-L" class="label preField reqMark" for="tfa_1">First Name</label><br><div class="inputWrapper"><input type="text" id="tfa_1" name="tfa_1" value="" aria-required="true" title="First Name" class="required"></div>
</div>
<div class="oneField field-container-D    " id="tfa_2-D">
<label id="tfa_2-L" class="label preField reqMark" for="tfa_2">Last Name</label><br><div class="inputWrapper"><input type="text" id="tfa_2" name="tfa_2" value="" aria-required="true" title="Last Name" class="required"></div>
</div>
<div class="oneField field-container-D    " id="tfa_4-D">
<label id="tfa_4-L" class="label preField reqMark" for="tfa_4">Email Address</label><br><div class="inputWrapper"><input type="text" id="tfa_4" name="tfa_4" value="" aria-required="true" title="Email Address" class="validate-email required"></div>
</div>
</fieldset>
<div id="tfa_333" class="section inline group">
<input type="hidden" id="tfa_320" name="tfa_320" value="Counselor Recruitment Event (i" class=""><input type="hidden" id="tfa_322" name="tfa_322" value="New" class="">
</div>
<div id="tfa_344" class="section inline group">
<input type="hidden" id="tfa_337" name="tfa_337" value="Webform" class=""><div class="oneField field-container-D     wf-acl-hidden" id="tfa_343-D">
<label id="tfa_343-L" class="label preField " for="tfa_343">Lead Source (Hidden)</label><br><div class="inputWrapper"><input type="text" id="tfa_343" name="tfa_343" value="Recruitment Event" default="Recruitment Event" title="Lead Source (Hidden)" class=""></div>
</div>
</div>
<div style="padding-top: 0 !important; margin-top: 0 !important;" class="actions" id="11-A"><input type="submit" data-label="Submit" class="primaryAction" id="submit_button" value="Submit"></div>
<div style="clear:both"></div>
<input type="hidden" value="11" name="tfa_dbFormId" id="tfa_dbFormId"><input type="hidden" value="" name="tfa_dbResponseId" id="tfa_dbResponseId"><input type="hidden" value="4d443e20bd7802ccd7ff0064a53d4ef1" name="tfa_dbControl" id="tfa_dbControl"><input type="hidden" value="8" name="tfa_dbVersionId" id="tfa_dbVersionId"><input type="hidden" value="" name="tfa_switchedoff" id="tfa_switchedoff">
</form>
</div></div>
<p class="supportInfo" >
By submitting this form you are granting CSUMB permission to email you information regarding the University. 

  </p>
</div>

`

const InquiryPage = () => {
  return (
    <Layout pageTitle="Recruitment Event">
      <SiteHeader path="/admissions">Admissions</SiteHeader>
      <SiteNavigation navigation={null} />
      <Container>
        <PageTitle>Cal State Monterey Bay Recruitment Event</PageTitle>
        <div dangerouslySetInnerHTML={{ __html: inquiryForm }} />
      </Container>
    </Layout>
  )
}

export default InquiryPage

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { frontmatter: { name: { eq: "recruitmentEvent" } } }
    ) {
      edges {
        node {
          frontmatter {
            name
            title
          }
          html
        }
      }
    }
  }
`
