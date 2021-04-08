const app = require('../app');
const request = require('supertest');
const db = require('../models');
const should = require('should');

describe('회원가입, 로그인 기능은', () => {
    before(() => {
        return db.sequelize.sync({force: true})
    })
    describe('회원가입 성공 시', () => {
        it('Success Url로 Redirect 한다.', (done) => {
            request(app)
                .post('/accounts/signup')
                .send({email : "s94203@nate.com", password : "ckswhd123~"})
                .expect(302)
                .expect('Location', '/accounts/success')
                .end(done)
        })
    })
    describe('회원가입 실패 시', () => {
        it('Error Url로 Redirect 한다.', (done) => {
            request(app)
                .post('/accounts/signup')
                .send({email : "s94203@nate.com", password : "ckswhd123~"})
                .expect(302)
                .expect('Location', '/accounts/error')
                .end(done);
        })
    })
    describe('로그인 성공 시', () => {
        it('Success Url로 Redirect한다.', (done) => {
            request(app)
                .post('/accounts/login')
                .send({email : "s94203@nate.com", password : "ckswhd123~"})
                .expect('Location', '/accounts/success')
                .end(done)
        })
    })
    describe('로그인 실패 시', () => {
        it('Error Url로 Redirect한다.', (done) => {
            request(app)
                .post('/accounts/login')
                .send({email : "s94203@nate.com", password : "wrongpassword"})
                .expect(302)
                .expect('Location', '/accounts/error')
                .end(done);
        })
    })
})