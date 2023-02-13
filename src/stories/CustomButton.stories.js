import "../assets/styles/main.scss";
import "../assets/styles/icon.scss";
import "../assets/styles/variable.scss";
import CustomButton from "../components/CustomButton.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "CustomButton",
  component: CustomButton,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    // word: {},
    transitionClr: { control: "color" },
    onClick: {},
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { CustomButton },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<CustomButton v-bind="args" />',
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
  isTransition: false,
  word: "Button",
};

export const TransitionRed = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
TransitionRed.args = {
  isTransition: true,
  transitionClr: "#e60012",
  word: "Button",
};
