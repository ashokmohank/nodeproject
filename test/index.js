import http from 'http';
import assert from 'assert';
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import request from 'request';
import chai, { expect, should } from 'chai';
// import chaiAsPromised from 'chai-as-promised';

// chai.use(chaiAsPromised);
// should();
/* global describe it expect:true */

let testToken = null;

describe('Test API Node Server', () => {
  it('should return 200', (done) => {
    http.get('http://127.0.0.1:8080', (res) => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});

describe('Test Graphql Endpoint without query and authorization', () => {
  it('should return a bad request 400', (done) => {
    http.get('http://127.0.0.1:8080/graphql', (res) => {
      assert.equal(400, res.statusCode);
      done();
    });
  });
});

describe('Test token generation without any Oauth2', () => {
  it('should return a unauthorized request 401', (done) => {
    http.get('http://127.0.0.1:8080/token', (res) => {
      assert.equal(401, res.statusCode);
      done();
    });
  });
});

describe('Test token generation with Oauth2', () => {
  it('should return with a token', (done) => {
    const options = { method: 'POST',
      uri: 'http://localhost:8080/token',
      headers:
       { authorization: 'Basic YXNob2s6YXNob2s=',
         'content-type': 'application/x-www-form-urlencoded' },
      form:
       { grant_type: 'password',
         clientId: 'android',
         clientSecret: 'SomeRandomCharsAndNumbers',
         username: 'ashok',
         password: 'a' },
    };
    request(options, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      const bodyTmp = JSON.parse(body);
      const tokenTmp = bodyTmp.access_token;
      testToken = `Bearer ${tokenTmp}`;
      // console.log(testToken);
      done();
    });
  }).timeout(15000);
});

describe('Get all users with generated Token', () => {
  it('should return with a valid respose', (done) => {
    const options = { method: 'GET',
      url: 'http://localhost:8080/api/users',
      headers: { 'postman-token': '71a554ba-48a7-f6ca-ae95-2dfb4306da91',
        'cache-control': 'no-cache',
        authorization: testToken,
        'content-type': 'application/json' },
      body: { username: 'ashok', password: 'ashok' },
      json: true };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      expect(response.statusCode).to.equal(200);
      expect(body).to.not.be.undefined;
      done();
    });
  }).timeout(15000);
});

describe('Graphql with query:tests', () => {
  it('should return with a valid respose', (done) => {
    const options = { method: 'POST',
      url: 'http://localhost:8080/graphqlauth',
      headers: { 'postman-token': 'a439e009-dfe1-ee17-ef76-a24a9c3fe301',
        'cache-control': 'no-cache',
        authorization: testToken,
        accept: 'application/json',
        'content-type': 'application/json' },
      body: '{"query":"query{  tests{ clientId token  userId { _id hashedPassword username } } }","variables":null}' };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      expect(response.statusCode).to.equal(200);
      expect(body).to.not.be.undefined;
      const bodyTmp = JSON.parse(body);
      const errorTmp = bodyTmp.errors;
      expect(errorTmp).to.be.undefined;
      done();
    });
  }).timeout(15000);
});
