const helpers = {
  renderByTemplate: function (template, data, wrapperId, position) {
    const html = template(data);
    const wrapper = wrapperId ? document.getElementById(wrapperId) : document.body;

    wrapper.insertAdjacentHTML(position, html);
  },
};

export default helpers;