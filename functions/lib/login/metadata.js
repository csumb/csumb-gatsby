module.exports = {
  sp: {
    local: `<?xml version="1.0" encoding="UTF-8"?>
    <saml2:Assertion
        xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" ID="id6075589608935514393256815" IssueInstant="2019-06-07T13:01:39.037Z" Version="2.0">
        <saml2:Issuer Format="urn:oasis:names:tc:SAML:2.0:nameid-format:entity">http://www.okta.com/Issuer</saml2:Issuer>
        <saml2:Subject>
            <saml2:NameID Format="urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified">userName</saml2:NameID>
            <saml2:SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
                <saml2:SubjectConfirmationData NotOnOrAfter="2019-06-07T13:06:39.038Z" Recipient="http://localhost:5000/csumb-gatsby-develop/us-central1/login"/>
            </saml2:SubjectConfirmation>
        </saml2:Subject>
        <saml2:Conditions NotBefore="2019-06-07T12:56:39.038Z" NotOnOrAfter="2019-06-07T13:06:39.038Z">
            <saml2:AudienceRestriction>
                <saml2:Audience>http://localhost:5000/csumb-gatsby-develop/us-central1/login</saml2:Audience>
            </saml2:AudienceRestriction>
        </saml2:Conditions>
        <saml2:AuthnStatement AuthnInstant="2019-06-07T13:01:39.037Z">
            <saml2:AuthnContext>
                <saml2:AuthnContextClassRef>urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport</saml2:AuthnContextClassRef>
            </saml2:AuthnContext>
        </saml2:AuthnStatement>
        <saml2:AttributeStatement>
            <saml2:Attribute Name="username" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified">
                <saml2:AttributeValue
                    xmlns:xs="http://www.w3.org/2001/XMLSchema"
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">user.login
                </saml2:AttributeValue>
            </saml2:Attribute>
            <saml2:Attribute Name="firstName" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified">
                <saml2:AttributeValue
                    xmlns:xs="http://www.w3.org/2001/XMLSchema"
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">user.firstName
                </saml2:AttributeValue>
            </saml2:Attribute>
            <saml2:Attribute Name="lastName" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified">
                <saml2:AttributeValue
                    xmlns:xs="http://www.w3.org/2001/XMLSchema"
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">user.lastName
                </saml2:AttributeValue>
            </saml2:Attribute>
            <saml2:Attribute Name="email" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified">
                <saml2:AttributeValue
                    xmlns:xs="http://www.w3.org/2001/XMLSchema"
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">user.email
                </saml2:AttributeValue>
            </saml2:Attribute>
        </saml2:AttributeStatement>
    </saml2:Assertion>`,
    dev: `<?xml version="1.0" encoding="UTF-8"?>
    <saml2:Assertion
        xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" ID="id63331122042373301945264756" IssueInstant="2019-06-10T12:51:32.365Z" Version="2.0">
        <saml2:Issuer Format="urn:oasis:names:tc:SAML:2.0:nameid-format:entity">http://www.okta.com/Issuer</saml2:Issuer>
        <saml2:Subject>
            <saml2:NameID Format="urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified">userName</saml2:NameID>
            <saml2:SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
                <saml2:SubjectConfirmationData NotOnOrAfter="2019-06-10T12:56:32.366Z" Recipient="http://csumb-gatsby-develop.firebaseapp.com/log-in"/>
            </saml2:SubjectConfirmation>
        </saml2:Subject>
        <saml2:Conditions NotBefore="2019-06-10T12:46:32.366Z" NotOnOrAfter="2019-06-10T12:56:32.366Z">
            <saml2:AudienceRestriction>
                <saml2:Audience>http://csumb-gatsby-develop.firebaseapp.com/log-in</saml2:Audience>
            </saml2:AudienceRestriction>
        </saml2:Conditions>
        <saml2:AuthnStatement AuthnInstant="2019-06-10T12:51:32.365Z">
            <saml2:AuthnContext>
                <saml2:AuthnContextClassRef>urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport</saml2:AuthnContextClassRef>
            </saml2:AuthnContext>
        </saml2:AuthnStatement>
        <saml2:AttributeStatement>
            <saml2:Attribute Name="login" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified">
                <saml2:AttributeValue
                    xmlns:xs="http://www.w3.org/2001/XMLSchema"
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">user.login
                </saml2:AttributeValue>
            </saml2:Attribute>
            <saml2:Attribute Name="firstName" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified">
                <saml2:AttributeValue
                    xmlns:xs="http://www.w3.org/2001/XMLSchema"
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">user.firstName
                </saml2:AttributeValue>
            </saml2:Attribute>
            <saml2:Attribute Name="lastName" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified">
                <saml2:AttributeValue
                    xmlns:xs="http://www.w3.org/2001/XMLSchema"
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">user.lastName
                </saml2:AttributeValue>
            </saml2:Attribute>
            <saml2:Attribute Name="email" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified">
                <saml2:AttributeValue
                    xmlns:xs="http://www.w3.org/2001/XMLSchema"
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">user.email
                </saml2:AttributeValue>
            </saml2:Attribute>
            <saml2:Attribute Name="roles" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified">
                <saml2:AttributeValue
                    xmlns:xs="http://www.w3.org/2001/XMLSchema"
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">user.cmsRole
                </saml2:AttributeValue>
            </saml2:Attribute>
            <saml2:Attribute Name="secondEmail" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified">
                <saml2:AttributeValue
                    xmlns:xs="http://www.w3.org/2001/XMLSchema"
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">user.secondEmail
                </saml2:AttributeValue>
            </saml2:Attribute>
        </saml2:AttributeStatement>
    </saml2:Assertion>`,
    live: `<?xml version="1.0" encoding="UTF-8"?>
    <saml2:Assertion
        xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" ID="id65194404936617471526858948" IssueInstant="2019-06-12T17:08:58.325Z" Version="2.0">
        <saml2:Issuer Format="urn:oasis:names:tc:SAML:2.0:nameid-format:entity"/>
        <saml2:Subject>
            <saml2:NameID Format="urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified">userName</saml2:NameID>
            <saml2:SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
                <saml2:SubjectConfirmationData NotOnOrAfter="2019-06-12T17:13:58.325Z" Recipient="https://csumb.edu/log-in"/>
            </saml2:SubjectConfirmation>
        </saml2:Subject>
        <saml2:Conditions NotBefore="2019-06-12T17:03:58.325Z" NotOnOrAfter="2019-06-12T17:13:58.325Z">
            <saml2:AudienceRestriction>
                <saml2:Audience>https://csumb.edu/log-in</saml2:Audience>
            </saml2:AudienceRestriction>
        </saml2:Conditions>
        <saml2:AuthnStatement AuthnInstant="2019-06-12T17:08:58.325Z">
            <saml2:AuthnContext>
                <saml2:AuthnContextClassRef>urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport</saml2:AuthnContextClassRef>
            </saml2:AuthnContext>
        </saml2:AuthnStatement>
        <saml2:AttributeStatement>
            <saml2:Attribute Name="login" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified">
                <saml2:AttributeValue
                    xmlns:xs="http://www.w3.org/2001/XMLSchema"
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">user.login
                </saml2:AttributeValue>
            </saml2:Attribute>
            <saml2:Attribute Name="firstName" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified">
                <saml2:AttributeValue
                    xmlns:xs="http://www.w3.org/2001/XMLSchema"
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">user.firstName
                </saml2:AttributeValue>
            </saml2:Attribute>
            <saml2:Attribute Name="lastName" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified">
                <saml2:AttributeValue
                    xmlns:xs="http://www.w3.org/2001/XMLSchema"
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">user.lastName
                </saml2:AttributeValue>
            </saml2:Attribute>
            <saml2:Attribute Name="email" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified">
                <saml2:AttributeValue
                    xmlns:xs="http://www.w3.org/2001/XMLSchema"
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">user.email
                </saml2:AttributeValue>
            </saml2:Attribute>
            <saml2:Attribute Name="roles" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified">
                <saml2:AttributeValue
                    xmlns:xs="http://www.w3.org/2001/XMLSchema"
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">user.cmsRole
                </saml2:AttributeValue>
            </saml2:Attribute>
            <saml2:Attribute Name="secondEmail" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified">
                <saml2:AttributeValue
                    xmlns:xs="http://www.w3.org/2001/XMLSchema"
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">user.secondEmail
                </saml2:AttributeValue>
            </saml2:Attribute>
            <saml2:Attribute Name="employeeNumber" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified">
                <saml2:AttributeValue
                    xmlns:xs="http://www.w3.org/2001/XMLSchema"
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">user.employeeNumber
                </saml2:AttributeValue>
            </saml2:Attribute>
            <saml2:Attribute Name="directoryTitle" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified">
                <saml2:AttributeValue
                    xmlns:xs="http://www.w3.org/2001/XMLSchema"
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">user.directoryTitle
                </saml2:AttributeValue>
            </saml2:Attribute>
            <saml2:Attribute Name="directoryDepartment" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified">
                <saml2:AttributeValue
                    xmlns:xs="http://www.w3.org/2001/XMLSchema"
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">user.directoryDepartment
                </saml2:AttributeValue>
            </saml2:Attribute>
        </saml2:AttributeStatement>
    </saml2:Assertion>`,
  },
  idp: {
    dev: `<?xml version="1.0" encoding="UTF-8"?><md:EntityDescriptor xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata" entityID="http://www.okta.com/exkmey914mz0RN9060x7"><md:IDPSSODescriptor WantAuthnRequestsSigned="false" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol"><md:KeyDescriptor use="signing"><ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><ds:X509Data><ds:X509Certificate>MIIDmjCCAoKgAwIBAgIGAV2mkQFeMA0GCSqGSIb3DQEBCwUAMIGNMQswCQYDVQQGEwJVUzETMBEG
A1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEU
MBIGA1UECwwLU1NPUHJvdmlkZXIxDjAMBgNVBAMMBWNzdW1iMRwwGgYJKoZIhvcNAQkBFg1pbmZv
QG9rdGEuY29tMB4XDTE3MDgwMzA1MjcyN1oXDTI3MDgwMzA1MjgyNlowgY0xCzAJBgNVBAYTAlVT
MRMwEQYDVQQIDApDYWxpZm9ybmlhMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMQ0wCwYDVQQKDARP
a3RhMRQwEgYDVQQLDAtTU09Qcm92aWRlcjEOMAwGA1UEAwwFY3N1bWIxHDAaBgkqhkiG9w0BCQEW
DWluZm9Ab2t0YS5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCYpuRle8PcqxCz
i7YzbeWXvrLvA6qPBl3ypB9MQwUCaqZHtMod3JAtEwR/eIJvtOC3BoyHLT31EWQsZ44JcLNJuwBQ
VMDG2beRhN4VdtdlT82MIxH8YJq+vMYsq2XSZ0l76RXXH+1dT7hVea9CmtRgnEmjalRfWNJbZUmg
Wk0/4US4LHajZC4w0DTTDXxu63y48Gwk5jkxAX8mxGSmuVbEhXg0fddLTBQUmIItH0i4UaKEzleI
rHTA/3Kw36icV3eCtBvJ5J1s/QUYNrKJYfXAGC8dZ3KhdzXB2fgcjSWErdshoAjeV8w/oCEOruPM
Vr9HKzkGUAGX9yIrwcffNVnnAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAG4a96JuKfjZz1FIwPkw
oqbOvgfrtEUzhmTKWlLMuuzE2SPG0KGsKQm3UtagH4+w8Qz9pXKpwYlvzgdhmS7rk53SKqciI+2y
GWu97pfvmMatwWAbUNoOFqIamngNGkIcgduHTPi1Ys77+C+0zteDg2XYtwcBOmRNHlDUoavqS/X1
PGwG+QRi3DYgnjXVAAZ1UmyY1wLQJWhGkhKZdvQI3cE41a56AhETD1Fc7SzFmnCHnJ1Y9KMTSEaH
c7olpGogULQ+NjAS5xxik975CHGM9b0vgIBcz+ZAqc1YyvLbjhb0vRRiYqPXUwu+9QnhRQYioY/W
/q3zEqy4at4mq5+HM8w=</ds:X509Certificate></ds:X509Data></ds:KeyInfo></md:KeyDescriptor><md:NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified</md:NameIDFormat><md:NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress</md:NameIDFormat><md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://login.csumb.edu/app/csumb_csumbwebsitedevremote_1/exkmey914mz0RN9060x7/sso/saml"/><md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://login.csumb.edu/app/csumb_csumbwebsitedevremote_1/exkmey914mz0RN9060x7/sso/saml"/></md:IDPSSODescriptor></md:EntityDescriptor>`,
    local: `
  <?xml version="1.0" encoding="UTF-8"?><md:EntityDescriptor xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata" entityID="http://www.okta.com/exkmehmp7rzx2KlfR0x7"><md:IDPSSODescriptor WantAuthnRequestsSigned="false" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol"><md:KeyDescriptor use="signing"><ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><ds:X509Data><ds:X509Certificate>MIIDmjCCAoKgAwIBAgIGAV2mkQFeMA0GCSqGSIb3DQEBCwUAMIGNMQswCQYDVQQGEwJVUzETMBEG
  A1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEU
  MBIGA1UECwwLU1NPUHJvdmlkZXIxDjAMBgNVBAMMBWNzdW1iMRwwGgYJKoZIhvcNAQkBFg1pbmZv
  QG9rdGEuY29tMB4XDTE3MDgwMzA1MjcyN1oXDTI3MDgwMzA1MjgyNlowgY0xCzAJBgNVBAYTAlVT
  MRMwEQYDVQQIDApDYWxpZm9ybmlhMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMQ0wCwYDVQQKDARP
  a3RhMRQwEgYDVQQLDAtTU09Qcm92aWRlcjEOMAwGA1UEAwwFY3N1bWIxHDAaBgkqhkiG9w0BCQEW
  DWluZm9Ab2t0YS5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCYpuRle8PcqxCz
  i7YzbeWXvrLvA6qPBl3ypB9MQwUCaqZHtMod3JAtEwR/eIJvtOC3BoyHLT31EWQsZ44JcLNJuwBQ
  VMDG2beRhN4VdtdlT82MIxH8YJq+vMYsq2XSZ0l76RXXH+1dT7hVea9CmtRgnEmjalRfWNJbZUmg
  Wk0/4US4LHajZC4w0DTTDXxu63y48Gwk5jkxAX8mxGSmuVbEhXg0fddLTBQUmIItH0i4UaKEzleI
  rHTA/3Kw36icV3eCtBvJ5J1s/QUYNrKJYfXAGC8dZ3KhdzXB2fgcjSWErdshoAjeV8w/oCEOruPM
  Vr9HKzkGUAGX9yIrwcffNVnnAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAG4a96JuKfjZz1FIwPkw
  oqbOvgfrtEUzhmTKWlLMuuzE2SPG0KGsKQm3UtagH4+w8Qz9pXKpwYlvzgdhmS7rk53SKqciI+2y
  GWu97pfvmMatwWAbUNoOFqIamngNGkIcgduHTPi1Ys77+C+0zteDg2XYtwcBOmRNHlDUoavqS/X1
  PGwG+QRi3DYgnjXVAAZ1UmyY1wLQJWhGkhKZdvQI3cE41a56AhETD1Fc7SzFmnCHnJ1Y9KMTSEaH
  c7olpGogULQ+NjAS5xxik975CHGM9b0vgIBcz+ZAqc1YyvLbjhb0vRRiYqPXUwu+9QnhRQYioY/W
  /q3zEqy4at4mq5+HM8w=</ds:X509Certificate></ds:X509Data></ds:KeyInfo></md:KeyDescriptor><md:NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified</md:NameIDFormat><md:NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress</md:NameIDFormat><md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://login.csumb.edu/app/csumb_csumbwebsitedevlocal_1/exkmehmp7rzx2KlfR0x7/sso/saml"/><md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://login.csumb.edu/app/csumb_csumbwebsitedevlocal_1/exkmehmp7rzx2KlfR0x7/sso/saml"/></md:IDPSSODescriptor></md:EntityDescriptor>`,

    live: `
  <?xml version="1.0" encoding="UTF-8"?><md:EntityDescriptor xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata" entityID="http://www.okta.com/exkmflkimsu80ciSD0x7"><md:IDPSSODescriptor WantAuthnRequestsSigned="false" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol"><md:KeyDescriptor use="signing"><ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><ds:X509Data><ds:X509Certificate>MIIDmjCCAoKgAwIBAgIGAV2mkQFeMA0GCSqGSIb3DQEBCwUAMIGNMQswCQYDVQQGEwJVUzETMBEG
  A1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEU
  MBIGA1UECwwLU1NPUHJvdmlkZXIxDjAMBgNVBAMMBWNzdW1iMRwwGgYJKoZIhvcNAQkBFg1pbmZv
  QG9rdGEuY29tMB4XDTE3MDgwMzA1MjcyN1oXDTI3MDgwMzA1MjgyNlowgY0xCzAJBgNVBAYTAlVT
  MRMwEQYDVQQIDApDYWxpZm9ybmlhMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMQ0wCwYDVQQKDARP
  a3RhMRQwEgYDVQQLDAtTU09Qcm92aWRlcjEOMAwGA1UEAwwFY3N1bWIxHDAaBgkqhkiG9w0BCQEW
  DWluZm9Ab2t0YS5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCYpuRle8PcqxCz
  i7YzbeWXvrLvA6qPBl3ypB9MQwUCaqZHtMod3JAtEwR/eIJvtOC3BoyHLT31EWQsZ44JcLNJuwBQ
  VMDG2beRhN4VdtdlT82MIxH8YJq+vMYsq2XSZ0l76RXXH+1dT7hVea9CmtRgnEmjalRfWNJbZUmg
  Wk0/4US4LHajZC4w0DTTDXxu63y48Gwk5jkxAX8mxGSmuVbEhXg0fddLTBQUmIItH0i4UaKEzleI
  rHTA/3Kw36icV3eCtBvJ5J1s/QUYNrKJYfXAGC8dZ3KhdzXB2fgcjSWErdshoAjeV8w/oCEOruPM
  Vr9HKzkGUAGX9yIrwcffNVnnAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAG4a96JuKfjZz1FIwPkw
  oqbOvgfrtEUzhmTKWlLMuuzE2SPG0KGsKQm3UtagH4+w8Qz9pXKpwYlvzgdhmS7rk53SKqciI+2y
  GWu97pfvmMatwWAbUNoOFqIamngNGkIcgduHTPi1Ys77+C+0zteDg2XYtwcBOmRNHlDUoavqS/X1
  PGwG+QRi3DYgnjXVAAZ1UmyY1wLQJWhGkhKZdvQI3cE41a56AhETD1Fc7SzFmnCHnJ1Y9KMTSEaH
  c7olpGogULQ+NjAS5xxik975CHGM9b0vgIBcz+ZAqc1YyvLbjhb0vRRiYqPXUwu+9QnhRQYioY/W
  /q3zEqy4at4mq5+HM8w=</ds:X509Certificate></ds:X509Data></ds:KeyInfo></md:KeyDescriptor><md:NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified</md:NameIDFormat><md:NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress</md:NameIDFormat><md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://login.csumb.edu/app/csumb_csumbwebsitestaging_1/exkmflkimsu80ciSD0x7/sso/saml"/><md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://login.csumb.edu/app/csumb_csumbwebsitestaging_1/exkmflkimsu80ciSD0x7/sso/saml"/></md:IDPSSODescriptor></md:EntityDescriptor>`,
  },
}
