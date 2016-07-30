'use strict';

(function() {

    class UserController {
        constructor(User, Auth, $state) {
            // Use the User $resource to fetch all users
            this.users = User.query();
            this.Auth = Auth;
            this.$state = $state;

            if ($state.params.user){
                this.user = this.$state.params.user;
            }
            else if ($state.current.name === 'user_edit'){
                this.$state.go('user');
            }
        }

        delete(user) {
            user.$remove();
            this.users.splice(this.users.indexOf(user), 1);
        }

        create(form) {
            this.submitted = true;

            if (form.$valid) {
                this.Auth.createUser({
                        role: this.user.role,
                        name: this.user.name,
                        email: this.user.email,
                        password: this.user.password
                    })
                    .then(() => {
                        // Account created, redirect to user list
                        this.$state.go('user');
                    })
                    .catch(err => {
                        err = err.data;
                        this.errors = {};

                        // Update validity of form fields that match the mongoose errors
                        angular.forEach(err.errors, (error, field) => {
                            form[field].$setValidity('mongoose', false);
                            this.errors[field] = error.message;
                        });
                    });
            }
        }

        update(form) {
            this.submitted = true;

            if (form.$valid) {
                this.Auth.updateUser(this.user)
                    .then(() => {
                        // Account updated, redirect to user list
                        this.$state.go('user');
                    })
                    .catch(err => {
                        err = err.data;
                        this.errors = {};

                        // Update validity of form fields that match the mongoose errors
                        angular.forEach(err.errors, (error, field) => {
                            form[field].$setValidity('mongoose', false);
                            this.errors[field] = error.message;
                        });
                    });
            }
        }

        showEditUser(user) {
            if (user.role === 'admin'){
                return;
            }

            this.$state.go('user_edit', {user: user});
        }
    }

    angular.module('expenseTrackingApp.user')
        .controller('UserController', UserController);
})();
