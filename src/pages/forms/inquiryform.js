import React from 'react'
import {
  Layout,
  SiteHeader,
  SiteNavigation,
  PageTitle,
} from '../../components/layouts/default'
import { graphql } from 'gatsby'
import Container from '../../components/common/container'

const inquiryForm = `<!-- FORM: HEAD SECTION -->

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
<script>
    var FAoldJQ;
    if (typeof $ != 'undefined' && $.noConflict) FAoldJQ = $.noConflict(true);
</script>
<script src="https://csumb.tfaforms.net/js/jquery/jquery-2.1.4.min.js"></script>
<script src="https://csumb.tfaforms.net/js/typeahead/v1.2.0/typeahead.bundle.js"></script>
<script>
    var FA$ = $.noConflict(true);
    if (FAoldJQ) $ = FAoldJQ;
</script>

<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />

<!-- FORM: BODY SECTION -->
<div class="wFormContainer" style="margin: 0;" >
<style type="text/css">
            #tfa_307,
            *[id^="tfa_307["] {
                width: 200px !important;
            }
            #tfa_307-D,
            *[id^="tfa_307["][class~="field-container-D"] {
                width: auto !important;
            }
       
            #tfa_5,
            *[id^="tfa_5["] {
                width: 616px !important;
            }
            #tfa_5-D,
            *[id^="tfa_5["][class~="field-container-D"] {
                width: auto !important;
            }
       
            #tfa_304,
            *[id^="tfa_304["] {
                width: 100px !important;
            }
            #tfa_304-D,
            *[id^="tfa_304["][class~="field-container-D"] {
                width: auto !important;
            }
       
            #tfa_305,
            *[id^="tfa_305["] {
                width: 150px !important;
            }
            #tfa_305-D,
            *[id^="tfa_305["][class~="field-container-D"] {
                width: auto !important;
            }
       
            #tfa_316,
            *[id^="tfa_316["] {
                width: 250px !important;
            }
            #tfa_316-D,
            *[id^="tfa_316["][class~="field-container-D"] {
                width: auto !important;
            }
       
            #tfa_306,
            *[id^="tfa_306["] {
                width: 150px !important;
            }
            #tfa_306-D,
            *[id^="tfa_306["][class~="field-container-D"] {
                width: auto !important;
            }
            fieldset {
                border: none !important;
                padding: 0;
            }
            .supportInfo {
                margin-top: 35px;
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
        </style><div class=""><div class="wForm" style="background-color: transparent !important; padding: 0 !important" id="3-WRPR" dir="ltr">
<div class="codesection" id="code-3"></div>
<form method="post" action="https://csumb.tfaforms.net/responses/processor" class="hintsBelow labelsAbove" id="3" role="form">
<div class="htmlSection" id="tfa_345"><div class="htmlContent" id="tfa_345-HTML"></div></div>
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
<div class="oneField field-container-D    " id="tfa_307-D">
<label id="tfa_307-L" class="label preField reqMark" for="tfa_307">Year you plan to start college</label><br><div class="inputWrapper"><select id="tfa_307" name="tfa_307" title="Year you plan to start college" aria-required="true" class="required"><option value="">Please select...</option>
<option value="tfa_340" id="tfa_340" class="">Fall 2020</option>
<option value="tfa_342" id="tfa_342" class="">Spring 2021</option>
<option value="tfa_341" id="tfa_341" class="">Fall 2021</option>
<option value="tfa_348" id="tfa_348" class="">Spring 2022</option>
<option value="tfa_349" id="tfa_349" class="">Fall 2022</option>
<option value="tfa_350" id="tfa_350" class="">Spring 2023</option>
<option value="tfa_351" id="tfa_351" class="">Fall 2023</option>
<option value="tfa_352" id="tfa_352" class="">Spring 2024</option>
<option value="tfa_353" id="tfa_353" class="">Fall 2024</option>
<option value="tfa_354" id="tfa_354" class="">Spring 2025</option>
<option value="tfa_355" id="tfa_355" class="">Fall 2025</option></select></div>
</div>
</fieldset>
<fieldset id="tfa_334" class="section">
<legend id="tfa_334-L">Contact Information</legend>
<div class="oneField field-container-D    " id="tfa_5-D">
<label id="tfa_5-L" class="label preField " for="tfa_5">Home Address</label><br><div class="inputWrapper"><input type="text" id="tfa_5" name="tfa_5" value="" title="Home Address" class=""></div>
</div>
<div class="oneField field-container-D    " id="tfa_6-D">
<label id="tfa_6-L" class="label preField " for="tfa_6">City&nbsp;</label><br><div class="inputWrapper"><input type="text" id="tfa_6" name="tfa_6" value="" title="City " class=""></div>
</div>
<div class="oneField field-container-D    " id="tfa_7-D">
<label id="tfa_7-L" class="label preField " for="tfa_7">State</label><br><div class="inputWrapper"><select id="tfa_7" name="tfa_7" title="State" class=""><option value="">Please select...</option>
<option value="tfa_8" id="tfa_8" class="">Alabama</option>
<option value="tfa_9" id="tfa_9" class="">Alaska</option>
<option value="tfa_10" id="tfa_10" class="">Arizona</option>
<option value="tfa_11" id="tfa_11" class="">Arkansas</option>
<option value="tfa_12" id="tfa_12" class="">California</option>
<option value="tfa_13" id="tfa_13" class="">Colorado</option>
<option value="tfa_14" id="tfa_14" class="">Connecticut</option>
<option value="tfa_15" id="tfa_15" class="">Delaware</option>
<option value="tfa_16" id="tfa_16" class="">District Of Columbia</option>
<option value="tfa_17" id="tfa_17" class="">Florida</option>
<option value="tfa_18" id="tfa_18" class="">Georgia</option>
<option value="tfa_19" id="tfa_19" class="">Hawaii</option>
<option value="tfa_20" id="tfa_20" class="">Idaho</option>
<option value="tfa_21" id="tfa_21" class="">Illinois</option>
<option value="tfa_22" id="tfa_22" class="">Indiana</option>
<option value="tfa_23" id="tfa_23" class="">Iowa</option>
<option value="tfa_24" id="tfa_24" class="">Kansas</option>
<option value="tfa_25" id="tfa_25" class="">Kentucky</option>
<option value="tfa_26" id="tfa_26" class="">Louisiana</option>
<option value="tfa_27" id="tfa_27" class="">Maine</option>
<option value="tfa_28" id="tfa_28" class="">Maryland</option>
<option value="tfa_29" id="tfa_29" class="">Massachusetts</option>
<option value="tfa_30" id="tfa_30" class="">Michigan</option>
<option value="tfa_31" id="tfa_31" class="">Minnesota</option>
<option value="tfa_32" id="tfa_32" class="">Mississippi</option>
<option value="tfa_33" id="tfa_33" class="">Missouri</option>
<option value="tfa_34" id="tfa_34" class="">Montana</option>
<option value="tfa_35" id="tfa_35" class="">Nebraska</option>
<option value="tfa_36" id="tfa_36" class="">Nevada</option>
<option value="tfa_37" id="tfa_37" class="">New Hampshire</option>
<option value="tfa_38" id="tfa_38" class="">New Jersey</option>
<option value="tfa_39" id="tfa_39" class="">New Mexico</option>
<option value="tfa_40" id="tfa_40" class="">New York</option>
<option value="tfa_41" id="tfa_41" class="">North Carolina</option>
<option value="tfa_42" id="tfa_42" class="">North Dakota</option>
<option value="tfa_43" id="tfa_43" class="">Ohio</option>
<option value="tfa_44" id="tfa_44" class="">Oklahoma</option>
<option value="tfa_45" id="tfa_45" class="">Oregon</option>
<option value="tfa_46" id="tfa_46" class="">Pennsylvania</option>
<option value="tfa_47" id="tfa_47" class="">Rhode Island</option>
<option value="tfa_48" id="tfa_48" class="">South Carolina</option>
<option value="tfa_49" id="tfa_49" class="">South Dakota</option>
<option value="tfa_50" id="tfa_50" class="">Tennessee</option>
<option value="tfa_51" id="tfa_51" class="">Texas</option>
<option value="tfa_52" id="tfa_52" class="">Utah</option>
<option value="tfa_53" id="tfa_53" class="">Vermont</option>
<option value="tfa_54" id="tfa_54" class="">Virginia</option>
<option value="tfa_55" id="tfa_55" class="">Washington</option>
<option value="tfa_56" id="tfa_56" class="">West Virginia</option>
<option value="tfa_57" id="tfa_57" class="">Wisconsin</option>
<option value="tfa_58" id="tfa_58" class="">Wyoming</option>
<option value="tfa_59" id="tfa_59" class="">Puerto Rico</option>
<option value="tfa_60" id="tfa_60" class="">Virgin Island</option>
<option value="tfa_61" id="tfa_61" class="">Northern Mariana Islands</option>
<option value="tfa_62" id="tfa_62" class="">Guam</option>
<option value="tfa_63" id="tfa_63" class="">American Samoa</option>
<option value="tfa_64" id="tfa_64" class="">Palau</option></select></div>
</div>
<div class="oneField field-container-D    " id="tfa_304-D">
<label id="tfa_304-L" class="label preField " for="tfa_304">Zip Code</label><br><div class="inputWrapper"><input type="text" id="tfa_304" name="tfa_304" value="" maxlength="5" title="Zip Code" class="validate-custom ^([0-9]{5})([-]{1}[0-9]{4})?$"></div>
<script type="text/javascript">
                    if(typeof wFORMS != 'undefined') {
                        if(wFORMS.behaviors.validation) {
                            wFORMS.behaviors.validation.rules['customtfa_304'] =  { selector: '*[id="tfa_304"]', check: 'validateCustom'};
                            wFORMS.behaviors.validation.messages['customtfa_304'] = "Please enter a 5 digit zip code";
                        }
                    }</script>
</div>
<div class="oneField field-container-D    " id="tfa_66-D">
<label id="tfa_66-L" class="label preField " for="tfa_66">Country</label><br><div class="inputWrapper"><select id="tfa_66" name="tfa_66" title="Country" class=""><option value="">Please select...</option>
<option value="tfa_67" id="tfa_67" class="">Afghanistan</option>
<option value="tfa_68" id="tfa_68" class="">Albania</option>
<option value="tfa_69" id="tfa_69" class="">Algeria</option>
<option value="tfa_70" id="tfa_70" class="">American Samoa</option>
<option value="tfa_71" id="tfa_71" class="">Andorra</option>
<option value="tfa_72" id="tfa_72" class="">Angola</option>
<option value="tfa_73" id="tfa_73" class="">Anguilla</option>
<option value="tfa_74" id="tfa_74" class="">Antarctica</option>
<option value="tfa_75" id="tfa_75" class="">Antigua and Barbuda</option>
<option value="tfa_76" id="tfa_76" class="">Argentina</option>
<option value="tfa_77" id="tfa_77" class="">Armenia</option>
<option value="tfa_78" id="tfa_78" class="">Aruba</option>
<option value="tfa_79" id="tfa_79" class="">Australia</option>
<option value="tfa_80" id="tfa_80" class="">Austria</option>
<option value="tfa_81" id="tfa_81" class="">Azerbaijan</option>
<option value="tfa_82" id="tfa_82" class="">Bahamas</option>
<option value="tfa_83" id="tfa_83" class="">Bahrain</option>
<option value="tfa_84" id="tfa_84" class="">Bangladesh</option>
<option value="tfa_85" id="tfa_85" class="">Barbados</option>
<option value="tfa_86" id="tfa_86" class="">Belarus</option>
<option value="tfa_87" id="tfa_87" class="">Belgium</option>
<option value="tfa_88" id="tfa_88" class="">Belize</option>
<option value="tfa_89" id="tfa_89" class="">Benin</option>
<option value="tfa_90" id="tfa_90" class="">Bermuda</option>
<option value="tfa_91" id="tfa_91" class="">Bhutan</option>
<option value="tfa_92" id="tfa_92" class="">Bolivia</option>
<option value="tfa_93" id="tfa_93" class="">Bosnia and Herzegovina</option>
<option value="tfa_94" id="tfa_94" class="">Botswana</option>
<option value="tfa_95" id="tfa_95" class="">Bouvet Island</option>
<option value="tfa_96" id="tfa_96" class="">Brazil</option>
<option value="tfa_97" id="tfa_97" class="">British Indian Ocean Territory</option>
<option value="tfa_98" id="tfa_98" class="">Brunei</option>
<option value="tfa_99" id="tfa_99" class="">Bulgaria</option>
<option value="tfa_100" id="tfa_100" class="">Burkina Faso</option>
<option value="tfa_101" id="tfa_101" class="">Burundi</option>
<option value="tfa_102" id="tfa_102" class="">Cambodia</option>
<option value="tfa_103" id="tfa_103" class="">Cameroon</option>
<option value="tfa_104" id="tfa_104" class="">Canada</option>
<option value="tfa_105" id="tfa_105" class="">Cape Verde</option>
<option value="tfa_106" id="tfa_106" class="">Cayman Islands</option>
<option value="tfa_107" id="tfa_107" class="">Central African Republic</option>
<option value="tfa_108" id="tfa_108" class="">Chad</option>
<option value="tfa_109" id="tfa_109" class="">Chile</option>
<option value="tfa_110" id="tfa_110" class="">China</option>
<option value="tfa_111" id="tfa_111" class="">Christmas Island</option>
<option value="tfa_112" id="tfa_112" class="">Cocos ( Keeling ) Islands</option>
<option value="tfa_113" id="tfa_113" class="">Colombia</option>
<option value="tfa_114" id="tfa_114" class="">Comoros</option>
<option value="tfa_115" id="tfa_115" class="">Congo</option>
<option value="tfa_116" id="tfa_116" class="">Cook Islands</option>
<option value="tfa_117" id="tfa_117" class="">Costa Rica</option>
<option value="tfa_118" id="tfa_118" class="">Côte d ' Ivoire</option>
<option value="tfa_119" id="tfa_119" class="">Croatia ( Hrvatska )</option>
<option value="tfa_120" id="tfa_120" class="">Cuba</option>
<option value="tfa_121" id="tfa_121" class="">Cyprus</option>
<option value="tfa_122" id="tfa_122" class="">Czech Republic</option>
<option value="tfa_123" id="tfa_123" class="">Congo ( DRC )</option>
<option value="tfa_124" id="tfa_124" class="">Denmark</option>
<option value="tfa_125" id="tfa_125" class="">Djibouti</option>
<option value="tfa_126" id="tfa_126" class="">Dominica</option>
<option value="tfa_127" id="tfa_127" class="">Dominican Republic</option>
<option value="tfa_128" id="tfa_128" class="">East Timor</option>
<option value="tfa_129" id="tfa_129" class="">Ecuador</option>
<option value="tfa_130" id="tfa_130" class="">Egypt</option>
<option value="tfa_131" id="tfa_131" class="">El Salvador</option>
<option value="tfa_132" id="tfa_132" class="">Equatorial Guinea</option>
<option value="tfa_133" id="tfa_133" class="">Eritrea</option>
<option value="tfa_134" id="tfa_134" class="">Estonia</option>
<option value="tfa_135" id="tfa_135" class="">Ethiopia</option>
<option value="tfa_136" id="tfa_136" class="">Falkland Islands ( Islas Malvinas )</option>
<option value="tfa_137" id="tfa_137" class="">Faroe Islands</option>
<option value="tfa_138" id="tfa_138" class="">Fiji Islands</option>
<option value="tfa_139" id="tfa_139" class="">Finland</option>
<option value="tfa_140" id="tfa_140" class="">France</option>
<option value="tfa_141" id="tfa_141" class="">French Guiana</option>
<option value="tfa_142" id="tfa_142" class="">French Polynesia</option>
<option value="tfa_143" id="tfa_143" class="">French Southern and Antarctic Lands</option>
<option value="tfa_144" id="tfa_144" class="">Gabon</option>
<option value="tfa_145" id="tfa_145" class="">Gambia</option>
<option value="tfa_146" id="tfa_146" class="">Georgia</option>
<option value="tfa_147" id="tfa_147" class="">Germany</option>
<option value="tfa_148" id="tfa_148" class="">Ghana</option>
<option value="tfa_149" id="tfa_149" class="">Gibraltar</option>
<option value="tfa_150" id="tfa_150" class="">Greece</option>
<option value="tfa_151" id="tfa_151" class="">Greenland</option>
<option value="tfa_152" id="tfa_152" class="">Grenada</option>
<option value="tfa_153" id="tfa_153" class="">Guadeloupe</option>
<option value="tfa_154" id="tfa_154" class="">Guam</option>
<option value="tfa_155" id="tfa_155" class="">Guatemala</option>
<option value="tfa_156" id="tfa_156" class="">Guinea</option>
<option value="tfa_157" id="tfa_157" class="">Guinea-Bissau</option>
<option value="tfa_158" id="tfa_158" class="">Guyana</option>
<option value="tfa_159" id="tfa_159" class="">Haiti</option>
<option value="tfa_160" id="tfa_160" class="">Heard Island and McDonald Islands</option>
<option value="tfa_161" id="tfa_161" class="">Honduras</option>
<option value="tfa_162" id="tfa_162" class="">Hong Kong SAR</option>
<option value="tfa_163" id="tfa_163" class="">Hungary</option>
<option value="tfa_164" id="tfa_164" class="">Iceland</option>
<option value="tfa_165" id="tfa_165" class="">India</option>
<option value="tfa_166" id="tfa_166" class="">Indonesia</option>
<option value="tfa_167" id="tfa_167" class="">Iran</option>
<option value="tfa_168" id="tfa_168" class="">Iraq</option>
<option value="tfa_169" id="tfa_169" class="">Ireland</option>
<option value="tfa_170" id="tfa_170" class="">Israel</option>
<option value="tfa_171" id="tfa_171" class="">Italy</option>
<option value="tfa_172" id="tfa_172" class="">Jamaica</option>
<option value="tfa_173" id="tfa_173" class="">Japan</option>
<option value="tfa_174" id="tfa_174" class="">Jordan</option>
<option value="tfa_175" id="tfa_175" class="">Kazakhstan</option>
<option value="tfa_176" id="tfa_176" class="">Kenya</option>
<option value="tfa_177" id="tfa_177" class="">Kiribati</option>
<option value="tfa_178" id="tfa_178" class="">Korea</option>
<option value="tfa_179" id="tfa_179" class="">Kuwait</option>
<option value="tfa_180" id="tfa_180" class="">Kyrgyzstan</option>
<option value="tfa_181" id="tfa_181" class="">Laos</option>
<option value="tfa_182" id="tfa_182" class="">Latvia</option>
<option value="tfa_183" id="tfa_183" class="">Lebanon</option>
<option value="tfa_184" id="tfa_184" class="">Lesotho</option>
<option value="tfa_185" id="tfa_185" class="">Liberia</option>
<option value="tfa_186" id="tfa_186" class="">Libya</option>
<option value="tfa_187" id="tfa_187" class="">Liechtenstein</option>
<option value="tfa_188" id="tfa_188" class="">Lithuania</option>
<option value="tfa_189" id="tfa_189" class="">Luxembourg</option>
<option value="tfa_190" id="tfa_190" class="">Macao SAR</option>
<option value="tfa_191" id="tfa_191" class="">Macedonia, Former Yugoslav Republic of</option>
<option value="tfa_192" id="tfa_192" class="">Madagascar</option>
<option value="tfa_193" id="tfa_193" class="">Malawi</option>
<option value="tfa_194" id="tfa_194" class="">Malaysia</option>
<option value="tfa_195" id="tfa_195" class="">Maldives</option>
<option value="tfa_196" id="tfa_196" class="">Mali</option>
<option value="tfa_197" id="tfa_197" class="">Malta</option>
<option value="tfa_198" id="tfa_198" class="">Marshall Islands</option>
<option value="tfa_199" id="tfa_199" class="">Martinique</option>
<option value="tfa_200" id="tfa_200" class="">Mauritania</option>
<option value="tfa_201" id="tfa_201" class="">Mauritius</option>
<option value="tfa_202" id="tfa_202" class="">Mayotte</option>
<option value="tfa_203" id="tfa_203" class="">Mexico</option>
<option value="tfa_204" id="tfa_204" class="">Micronesia</option>
<option value="tfa_205" id="tfa_205" class="">Moldova</option>
<option value="tfa_206" id="tfa_206" class="">Monaco</option>
<option value="tfa_207" id="tfa_207" class="">Mongolia</option>
<option value="tfa_208" id="tfa_208" class="">Montserrat</option>
<option value="tfa_209" id="tfa_209" class="">Morocco</option>
<option value="tfa_210" id="tfa_210" class="">Mozambique</option>
<option value="tfa_211" id="tfa_211" class="">Myanmar</option>
<option value="tfa_212" id="tfa_212" class="">Namibia</option>
<option value="tfa_213" id="tfa_213" class="">Nauru</option>
<option value="tfa_214" id="tfa_214" class="">Nepal</option>
<option value="tfa_215" id="tfa_215" class="">Netherlands</option>
<option value="tfa_216" id="tfa_216" class="">Netherlands Antilles</option>
<option value="tfa_217" id="tfa_217" class="">New Caledonia</option>
<option value="tfa_218" id="tfa_218" class="">New Zealand</option>
<option value="tfa_219" id="tfa_219" class="">Nicaragua</option>
<option value="tfa_220" id="tfa_220" class="">Niger</option>
<option value="tfa_221" id="tfa_221" class="">Nigeria</option>
<option value="tfa_222" id="tfa_222" class="">Niue</option>
<option value="tfa_223" id="tfa_223" class="">Norfolk Island</option>
<option value="tfa_224" id="tfa_224" class="">North Korea</option>
<option value="tfa_225" id="tfa_225" class="">Northern Mariana Islands</option>
<option value="tfa_226" id="tfa_226" class="">Norway</option>
<option value="tfa_227" id="tfa_227" class="">Oman</option>
<option value="tfa_228" id="tfa_228" class="">Pakistan</option>
<option value="tfa_229" id="tfa_229" class="">Palau</option>
<option value="tfa_230" id="tfa_230" class="">Panama</option>
<option value="tfa_231" id="tfa_231" class="">Papua New Guinea</option>
<option value="tfa_232" id="tfa_232" class="">Paraguay</option>
<option value="tfa_233" id="tfa_233" class="">Peru</option>
<option value="tfa_234" id="tfa_234" class="">Philippines</option>
<option value="tfa_235" id="tfa_235" class="">Pitcairn Islands</option>
<option value="tfa_236" id="tfa_236" class="">Poland</option>
<option value="tfa_237" id="tfa_237" class="">Portugal</option>
<option value="tfa_238" id="tfa_238" class="">Puerto Rico</option>
<option value="tfa_239" id="tfa_239" class="">Qatar</option>
<option value="tfa_240" id="tfa_240" class="">Reunion</option>
<option value="tfa_241" id="tfa_241" class="">Romania</option>
<option value="tfa_242" id="tfa_242" class="">Russia</option>
<option value="tfa_243" id="tfa_243" class="">Rwanda</option>
<option value="tfa_244" id="tfa_244" class="">Samoa</option>
<option value="tfa_245" id="tfa_245" class="">San Marino</option>
<option value="tfa_246" id="tfa_246" class="">São Tomé and Prìncipe</option>
<option value="tfa_247" id="tfa_247" class="">Saudi Arabia</option>
<option value="tfa_248" id="tfa_248" class="">Senegal</option>
<option value="tfa_249" id="tfa_249" class="">Serbia and Montenegro</option>
<option value="tfa_250" id="tfa_250" class="">Seychelles</option>
<option value="tfa_251" id="tfa_251" class="">Sierra Leone</option>
<option value="tfa_252" id="tfa_252" class="">Singapore</option>
<option value="tfa_253" id="tfa_253" class="">Slovakia</option>
<option value="tfa_254" id="tfa_254" class="">Slovenia</option>
<option value="tfa_255" id="tfa_255" class="">Solomon Islands</option>
<option value="tfa_256" id="tfa_256" class="">Somalia</option>
<option value="tfa_257" id="tfa_257" class="">South Africa</option>
<option value="tfa_258" id="tfa_258" class="">South Georgia and the South Sandwich Islands</option>
<option value="tfa_259" id="tfa_259" class="">Spain</option>
<option value="tfa_260" id="tfa_260" class="">Sri Lanka</option>
<option value="tfa_261" id="tfa_261" class="">St. Helena</option>
<option value="tfa_262" id="tfa_262" class="">St. Kitts and Nevis</option>
<option value="tfa_263" id="tfa_263" class="">St. Lucia</option>
<option value="tfa_264" id="tfa_264" class="">St. Pierre and Miquelon</option>
<option value="tfa_265" id="tfa_265" class="">St. Vincent and the Grenadines</option>
<option value="tfa_266" id="tfa_266" class="">Sudan</option>
<option value="tfa_267" id="tfa_267" class="">Suriname</option>
<option value="tfa_268" id="tfa_268" class="">Svalbard and Jan Mayen</option>
<option value="tfa_269" id="tfa_269" class="">Swaziland</option>
<option value="tfa_270" id="tfa_270" class="">Sweden</option>
<option value="tfa_271" id="tfa_271" class="">Switzerland</option>
<option value="tfa_272" id="tfa_272" class="">Syria</option>
<option value="tfa_273" id="tfa_273" class="">Taiwan</option>
<option value="tfa_274" id="tfa_274" class="">Tajikistan</option>
<option value="tfa_275" id="tfa_275" class="">Tanzania</option>
<option value="tfa_276" id="tfa_276" class="">Thailand</option>
<option value="tfa_277" id="tfa_277" class="">Togo</option>
<option value="tfa_278" id="tfa_278" class="">Tokelau</option>
<option value="tfa_279" id="tfa_279" class="">Tonga</option>
<option value="tfa_280" id="tfa_280" class="">Trinidad and Tobago</option>
<option value="tfa_281" id="tfa_281" class="">Tunisia</option>
<option value="tfa_282" id="tfa_282" class="">Turkey</option>
<option value="tfa_283" id="tfa_283" class="">Turkmenistan</option>
<option value="tfa_284" id="tfa_284" class="">Turks and Caicos Islands</option>
<option value="tfa_285" id="tfa_285" class="">Tuvalu</option>
<option value="tfa_286" id="tfa_286" class="">Uganda</option>
<option value="tfa_287" id="tfa_287" class="">Ukraine</option>
<option value="tfa_288" id="tfa_288" class="">United Arab Emirates</option>
<option value="tfa_289" id="tfa_289" class="">United Kingdom</option>
<option value="tfa_290" id="tfa_290" class="" selected data-default-value="true">United States</option>
<option value="tfa_291" id="tfa_291" class="">United States Minor Outlying Islands</option>
<option value="tfa_292" id="tfa_292" class="">Uruguay</option>
<option value="tfa_293" id="tfa_293" class="">Uzbekistan</option>
<option value="tfa_294" id="tfa_294" class="">Vanuatu</option>
<option value="tfa_295" id="tfa_295" class="">Vatican City</option>
<option value="tfa_296" id="tfa_296" class="">Venezuela</option>
<option value="tfa_297" id="tfa_297" class="">Viet Nam</option>
<option value="tfa_298" id="tfa_298" class="">Virgin Islands ( British )</option>
<option value="tfa_299" id="tfa_299" class="">Virgin Islands</option>
<option value="tfa_300" id="tfa_300" class="">Wallis and Futuna</option>
<option value="tfa_301" id="tfa_301" class="">Yemen</option>
<option value="tfa_302" id="tfa_302" class="">Zambia</option>
<option value="tfa_303" id="tfa_303" class="">Zimbabwe</option></select></div>
</div>
<div class="oneField field-container-D    " id="tfa_305-D">
<label id="tfa_305-L" class="label preField " for="tfa_305">Phone Number</label><br><div class="inputWrapper"><input type="text" id="tfa_305" name="tfa_305" value="" maxlength="10" autoformat="(###) ###-####" title="Phone Number" class="validate-custom ^([(]{1}[0-9]{3}[)]{1}[.| |-]{0,1}|^[0-9]{3}[.|-| ]?)?[0-9]{3}(.|-| )?[0-9]{4}$"></div>
<script type="text/javascript">
                    if(typeof wFORMS != 'undefined') {
                        if(wFORMS.behaviors.validation) {
                            wFORMS.behaviors.validation.rules['customtfa_305'] =  { selector: '*[id="tfa_305"]', check: 'validateCustom'};
                            wFORMS.behaviors.validation.messages['customtfa_305'] = "Please enter a phone number in the format of (###)###-####";
                        }
                    }</script>
</div>
</fieldset>
<div id="tfa_333" class="section group">
<fieldset id="tfa_336" class="section">
<legend id="tfa_336-L">Help us get to know you</legend>
<div class="oneField field-container-D    " id="tfa_316-D">
<label id="tfa_316-L" class="label preField " for="tfa_316">What is your academic interest?</label><br><div class="inputWrapper">
<input type="text" id="tfa_316" name="tfa_316" value="" title="What is your academic interest?" data-dataset-allow-free-responses="0" data-dataset-json='[{"a":"Arts (Music, Film, etc.)"},{"a":"Business (Administration, Hospitality, etc.)"},{"a":"Communication (Writing, Journalism, etc.)"},{"a":"Education (Liberal Studies, Teaching, etc.)"},{"a":"Health Sciences (Kinesiology, Social Work, etc.)"},{"a":"Information Technology (Computer Science)"},{"a":"Language &amp; Cultures (Spanish, Japanese, etc.)"},{"a":"Math (Statistics, Mathematics, etc.)"},{"a":"Sciences (Biology, Marine Science, etc.)"},{"a":"Social Sciences (Psychology, Global Studies, etc.)"},{"a":"Undecided / Unknown"}]' autocomplete="off" class="wfAutosuggest"><i class="fa fa-spinner fa-pulse fa-fw tt-spinner"></i><i class="fa fa-search tt-search" aria-hidden="true"></i><i class="fa fa-times-circle tt-clear no-input" aria-hidden="true"></i>
</div>
</div>
<div class="oneField field-container-D    " id="tfa_306-D">
<label id="tfa_306-L" class="label preField " for="tfa_306">Date of Birth</label><br><div class="inputWrapper"><input type="text" id="tfa_306" name="tfa_306" value="" max="-|1_Days{}" autoformat="##/##/####" title="Date of Birth" class="validate-date"></div>
</div>
<div class="oneField field-container-D   hintsSide " id="tfa_327-D" role="radiogroup" aria-labelledby="tfa_327-L" data-tfa-labelledby="-L tfa_327-L">
<label id="tfa_327-L" class="label preField ">Are you a first generation college student?<br><i>(Your parent(s) do not possess a bachelor's degree)</i>&nbsp;</label><br><div class="inputWrapper"><span id="tfa_327" class="choices vertical "><span class="oneChoice"><input type="radio" value="tfa_328" class="" id="tfa_328" name="tfa_327" aria-labelledby="tfa_328-L" data-tfa-labelledby="tfa_327-L tfa_328-L"><label class="label postField" id="tfa_328-L" for="tfa_328"><span class="input-radio-faux"></span>Yes&nbsp;</label></span><span class="oneChoice"><input type="radio" value="tfa_329" class="" checked data-default-value="true" id="tfa_329" name="tfa_327" aria-labelledby="tfa_329-L" data-tfa-labelledby="tfa_327-L tfa_329-L"><label class="label postField" id="tfa_329-L" for="tfa_329"><span class="input-radio-faux"></span>No&nbsp;</label></span></span></div>
</div>
<div class="oneField field-container-D    " id="tfa_330-D" role="radiogroup" aria-labelledby="tfa_330-L" data-tfa-labelledby="-L tfa_330-L">
<label id="tfa_330-L" class="label preField ">Are you entering CSUMB as:&nbsp;</label><br><div class="inputWrapper"><span id="tfa_330" class="choices vertical "><span class="oneChoice"><input type="radio" value="tfa_331" class="" id="tfa_331" name="tfa_330" aria-labelledby="tfa_331-L" data-tfa-labelledby="tfa_330-L tfa_331-L"><label class="label postField" id="tfa_331-L" for="tfa_331"><span class="input-radio-faux"></span>First Time Freshman&nbsp;</label></span><span class="oneChoice"><input type="radio" value="tfa_332" class="" id="tfa_332" name="tfa_330" aria-labelledby="tfa_332-L" data-tfa-labelledby="tfa_330-L tfa_332-L"><label class="label postField" id="tfa_332-L" for="tfa_332"><span class="input-radio-faux"></span>Transfer Student</label></span><span class="oneChoice"><input type="radio" value="tfa_339" class="" id="tfa_339" name="tfa_330" aria-labelledby="tfa_339-L" data-tfa-labelledby="tfa_330-L tfa_339-L"><label class="label postField" id="tfa_339-L" for="tfa_339"><span class="input-radio-faux"></span>Masters or Credential</label></span></span></div>
</div>
</fieldset>
<input type="hidden" id="tfa_320" name="tfa_320" value="Inquiry Form - Website" class=""><input type="hidden" id="tfa_322" name="tfa_322" value="New" class="">
</div>
<input type="hidden" id="tfa_337" name="tfa_337" value="Webform" class=""><div class="oneField field-container-D     wf-acl-hidden" id="tfa_343-D">
<label id="tfa_343-L" class="label preField " for="tfa_343">Lead Source (Hidden)</label><br><div class="inputWrapper"><input type="text" id="tfa_343" name="tfa_343" value="Inquiry Card - Website" default="Inquiry Card - Website" title="Lead Source (Hidden)" class=""></div>
</div>
<div class="htmlSection" id="tfa_347"><div class="htmlContent" id="tfa_347-HTML"><div style="text-align: center;">Are you an international student? If so, please refer to this <a target="_blank" href="https://csumb.edu/international/interest-form">web contact form</a>.&nbsp;</<div></div></div>
<div class="actions" id="3-A"><input type="submit" data-label="Submit" class="primaryAction" id="submit_button" value="Submit"></div>
<div style="clear:both"></div>
<input type="hidden" value="3" name="tfa_dbFormId" id="tfa_dbFormId"><input type="hidden" value="" name="tfa_dbResponseId" id="tfa_dbResponseId"><input type="hidden" value="dad535b4dce9e29c43e31cc3ab40ead2" name="tfa_dbControl" id="tfa_dbControl"><input type="hidden" value="62" name="tfa_dbVersionId" id="tfa_dbVersionId"><input type="hidden" value="" name="tfa_switchedoff" id="tfa_switchedoff">
</form>
</div></div>
<p class="supportInfo" >
By submitting this form you are granting CSUMB permission to email you information regarding the University. 

  </p>
</div>
`

const InquiryPage = () => {
  return (
    <Layout pageTitle="Inquiry Form">
      <SiteHeader path="/admissions">Admissions</SiteHeader>
      <SiteNavigation navigation={null} />
      <Container>
        <PageTitle>Cal State Monterey Bay Request Information Form</PageTitle>
        <div dangerouslySetInnerHTML={{ __html: inquiryForm }} />
      </Container>
    </Layout>
  )
}

export default InquiryPage

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { frontmatter: { name: { eq: "inquiryform" } } }
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
