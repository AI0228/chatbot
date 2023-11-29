class Message {
  conversation;
  num_user_inputs;
  settings;

  constructor(settings: Record<string, any>) {
    this.conversation = "";
    this.num_user_inputs = 0;
    this.settings = settings;
  }

  get_prompt(user_input: string) {
    const user_prefix = this.settings["USER_PREFIX"];
    const starting_prompt = this.settings["STARTING_PROMPT"];
    const ai_prefix = this.settings["AI_PREFIX"];

    if (this.conversation === "") {
      this.conversation =
        starting_prompt + "\n" + user_prefix + user_input + "\n" + ai_prefix;
    } else {
      this.conversation =
        this.conversation.trim() +
        "\n" +
        user_prefix +
        user_input +
        "\n" +
        ai_prefix;
    }
    this.num_user_inputs += 1;

    if (this.num_user_inputs > this.settings["MAX_NUM_USER_INPUTS"]) {
      let split_conversation = this.conversation.split("\n" + user_prefix);
      // Remove the two first elements and then put the rest back together
      split_conversation.splice(0, 2);
      const remaining_conversation = split_conversation.join(
        "\n" + user_prefix,
      );

      this.conversation =
        starting_prompt +
        "\n" +
        this.settings["CUT_DIALOGUE_PLACEHOLDER"] +
        "\n" +
        user_prefix +
        remaining_conversation;
    }

    return this.conversation;
  }

  set_completion(completion: string) {
    this.conversation += completion;
  }
}

export default Message;
