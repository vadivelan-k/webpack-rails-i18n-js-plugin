var expect = require("expect.js");
var I18n = require("i18n");

describe("Translate", function(){

  it("returns translation for single scope", function(){
    expect(I18n.t("hello")).equal("Hello World!");
  });

  it("returns missing message translation for invalid scope", function(){
    actual = I18n.t("invalid.scope");
    expected = '[missing "en.invalid.scope" translation]';
    expect(actual).equal(expected);
  });

  it("returns missing message translation for valid scope with scope", function(){
    actual = I18n.t("monster", {scope: "greetings"});
    expected = '[missing "en.greetings.monster" translation]';
    expect(actual).equal(expected);
  });

  it("returns translation for multiple scopes", function(){
    expect(I18n.t("greetings.stranger")).equal("Hello stranger!");
  });

  describe("when provided default values", function() {
    it("uses scope provided in defaults if scope doesn't exist", function() {
      actual = I18n.t("Hello!", {defaults: [{scope: "greetings.stranger"}]});
      expect(actual).equal("Hello stranger!");
    });

    it("continues to fallback until a scope is found", function() {
      var defaults = [{scope: "foo"}, {scope: "hello"}];

      actual = I18n.t("foo", {defaults: defaults});
      expect(actual).equal("Hello World!");
    });

    it("uses message if specified as a default", function() {
      var defaults = [{message: "Hello all!"}];
      actual = I18n.t("foo", {defaults: defaults});
      expect(actual).equal("Hello all!");
    });

    it("uses the first message if no scopes are found", function() {
      var defaults = [
          {scope: "bar"}
        , {message: "Hello all!"}
        , {scope: "hello"}];
      actual = I18n.t("foo", {defaults: defaults});
      expect(actual).equal("Hello all!");
    });

    it("uses default value if no scope is found", function() {
      var options = {
          defaults: [{scope: "bar"}]
        , defaultValue: "Hello all!"
      };
      actual = I18n.t("foo", options);
      expect(actual).equal("Hello all!");
    });
  });

  it("uses default value for simple translation", function() {
    actual = I18n.t("warning", {defaultValue: "Warning!"});
    expect(actual).equal("Warning!");
  });

  it("uses default value with interpolation", function() {
    actual = I18n.t(
      "alert",
      {defaultValue: "Attention! {{message}}", message: "You're out of quota!"}
    );

    expect(actual).equal("Attention! You're out of quota!");
  });

  it("ignores default value when scope exists", function() {
    actual = I18n.t("hello", {defaultValue: "What's up?"});
    expect(actual).equal("Hello World!");
  });

  it("returns boolean values", function() {
    expect(I18n.t("booleans.yes")).equal(true);
    expect(I18n.t("booleans.no")).equal(false);
  });

  it("escapes $ when doing substitution (IE)", function() {
    expect(I18n.t("paid", {price: "$0.12"})).equal("You were paid $0.12");
    expect(I18n.t("paid", {price: "$1.35"})).equal("You were paid $1.35");
  });

  it("replaces all occurrences of escaped $", function() {
    expect(I18n.t("paid_with_vat", {
      price: "$0.12",
      vat: "$0.02"}
    )).equal("You were paid $0.12 (incl. VAT $0.02)");
  });

  it("sets default scope", function() {
    var options = {scope: "greetings"};
    expect(I18n.t("stranger", options)).equal("Hello stranger!");
  });

  it("accepts the scope as an array", function() {
    expect(I18n.t(["greetings", "stranger"])).equal("Hello stranger!");
  });

  it("accepts the scope as an array using a base scope", function() {
    expect(I18n.t(["stranger"], {scope: "greetings"})).equal("Hello stranger!");
  });

});
