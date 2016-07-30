'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var recordCtrlStub = {
    index: 'recordCtrl.index',
    show: 'recordCtrl.show',
    create: 'recordCtrl.create',
    update: 'recordCtrl.update',
    destroy: 'recordCtrl.destroy'
};

var authServiceStub = {
    isAuthenticated() {
        return 'authService.isAuthenticated';
    },
    hasRole(role) {
        return 'authService.hasRole.' + role;
    }
};

var routerStub = {
    get: sinon.spy(),
    put: sinon.spy(),
    patch: sinon.spy(),
    post: sinon.spy(),
    delete: sinon.spy()
};

// require the index with our stubbed out modules
var recordIndex = proxyquire('./index.js', {
    'express': {
        Router: function() {
            return routerStub;
        }
    },
    './record.controller': recordCtrlStub,
    '../../auth/auth.service': authServiceStub
});

describe('Record API Router:', function() {

    it('should return an express router instance', function() {
        recordIndex.should.equal(routerStub);
    });

    describe('GET /api/records', function() {

        it('should route to record.controller.index', function() {
            routerStub.get
                .withArgs('/', 'authService.isAuthenticated', 'recordCtrl.index')
                .should.have.been.calledOnce;
        });

    });

    describe('GET /api/records/:id', function() {

        it('should route to record.controller.show', function() {
            routerStub.get
                .withArgs('/:id', 'authService.isAuthenticated', 'recordCtrl.show')
                .should.have.been.calledOnce;
        });

    });

    describe('POST /api/records', function() {

        it('should route to record.controller.create', function() {
            routerStub.post
                .withArgs('/', 'authService.isAuthenticated', 'recordCtrl.create')
                .should.have.been.calledOnce;
        });

    });

    describe('PUT /api/records/:id', function() {

        it('should route to record.controller.update', function() {
            routerStub.put
                .withArgs('/:id', 'authService.isAuthenticated', 'recordCtrl.update')
                .should.have.been.calledOnce;
        });

    });

    describe('PATCH /api/records/:id', function() {

        it('should route to record.controller.update', function() {
            routerStub.patch
                .withArgs('/:id', 'authService.isAuthenticated', 'recordCtrl.update')
                .should.have.been.calledOnce;
        });

    });

    describe('DELETE /api/records/:id', function() {

        it('should route to record.controller.destroy', function() {
            routerStub.delete
                .withArgs('/:id', 'authService.isAuthenticated', 'recordCtrl.destroy')
                .should.have.been.calledOnce;
        });

    });

});
