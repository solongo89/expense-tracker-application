(function(angular, undefined) {
  angular.module("expenseTrackingApp.constants", [])

.constant("appConfig", {
	"userRoles": [
		"guest",
		"user",
		"manager",
		"admin"
	]
})

;
})(angular);