module ControllerMacros
  def login(user)
    @request.env["devise.mapping"] = Devese.mapping[:user]
    sign_in user
  end
end