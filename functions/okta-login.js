'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var saml2 = _interopDefault(require('saml2-js'));
var querystring = _interopDefault(require('querystring'));
var md5 = _interopDefault(require('md5'));

var idp = {
  sso_login_url:
    'https://csumb.okta.com/app/csumb_csumbnetlify_1/exknh9wep5PqjVpi40x7/sso/saml',
  sso_logout_url: 'https://idp.example.com/logout',
  certificates: `MIIDmjCCAoKgAwIBAgIGAV2mkQFeMA0GCSqGSIb3DQEBCwUAMIGNMQswCQYDVQQGEwJVUzETMBEG
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
    /q3zEqy4at4mq5+HM8w=`,
  force_authn: false,
  sign_get_request: false,
  allow_unencrypted_assertion: true,
};

var sp = {
  entity_id: 'https://csumb-edu.netlify.com/',
  audience: 'https://csumb-edu.netlify.com/',
  assert_endpoint:
    'https://csumb-edu.netlify.com/.netlify/functions/okta-login',
  private_key: '',
  certificate: '',
};

const salt = process.env.CSUMB_FUNCTIONS_USER_SALT;
const serviceProvider = new saml2.ServiceProvider(sp);
const identityProvider = new saml2.IdentityProvider(idp);

const fields = {
  single: [
    'login',
    'firstName',
    'lastName',
    'email',
    'secondEmail',
    'employeeNumber',
  ],
  array: ['roles'],
};

exports.handler = (event, context, callback) => {
  const body = querystring.parse(event.body);
  serviceProvider.post_assert(
    identityProvider,
    {
      request_body: body,
    },
    (err, saml_response) => {
      if (err != null) {
        console.log(err);
      }
      const { attributes } = saml_response.user.attributes;
      const user = {};
      fields.single.forEach(field => {
        if (typeof attributes[field] !== 'undefined') {
          user[field] = attributes[field][0];
        }
      });
      fields.array.forEach(field => {
        if (typeof attributes[field] !== 'undefined') {
          user[field] = attributes[field];
        }
      });
      user.token = md5(user.login.split('@').shift() + salt);
      const cookie = `csumbUser=${JSON.stringify(
        user
      )}; Secure; Domain=csumb-edu.netlify.com`;
      if (typeof body.RelayState !== 'undefined' && body.RelayState) {
        callback(null, {
          status: 301,
          headers: {
            Location: request.body.RelayState,
            'Set-cookie': cookie,
          },
        });
      } else {
        callback(null, {
          status: 301,
          headers: {
            Location: '/',
            'Set-cookie': cookie,
          },
        });
      }
    }
  );
};
