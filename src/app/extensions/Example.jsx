import React, { useState, useEffect } from "react";
import {
  Divider,
  Link,
  Button,
  Text,
  Input,
  Flex,
  Accordion,
  ButtonRow,
  hubspot,
} from "@hubspot/ui-extensions";
// Need to import any component you want to use before calling it below.


// Define the extension to be run within the Hubspot CRM
hubspot.extend(({ context, runServerlessFunction, actions }) => (
  <Extension
    context={context}
    runServerless={runServerlessFunction}
    sendAlert={actions.addAlert}
  />
));

// Define the Extension component, taking in runServerless, context, & sendAlert as props
const Extension = ({ context, runServerless, sendAlert }) => {
  const [text, setText] = useState("");
  const [loaded, setLoaded] = useState(false);


  // Call serverless function to execute with parameters.
  // The `myFunc` function name is configured inside `serverless.json`
  const handleClick = async () => {
    const { response } = await runServerless({ name: "myFunc", parameters: { text: text } });
    sendAlert({ message: response });
  };

  // Displays an alert when card loads for the first time
  useEffect(() => {
    setLoaded(true);
  }, []);

  if (loaded) {
    sendAlert({ message: "Example Card has loaded!"});
  }

  return (
    <>
      <Text>
        <Text format={{ fontWeight: "bold" }}>
          Your first UI extension is ready!
        </Text>
        Congratulations, {context.user.firstName}! You just deployed your first
        HubSpot UI extension. This example demonstrates how you would send
        parameters from your React frontend to the serverless function and get a
        response back.
      </Text>
      <Flex direction="row" align="end" gap="small">
        <Input name="text" label="Send" onInput={(t) => setText(t)} />
        <Button type="submit" onClick={handleClick}>
          Click me
        </Button>
      </Flex>
      <Divider />
      <Text>
        What now? Explore all available{" "}
        <Link href="https://developers.hubspot.com/docs/platform/ui-extension-components">
          UI components
        </Link>
        , get an overview of{" "}
        <Link href="https://developers.hubspot.com/docs/platform/ui-extensions-overview">
          UI extensions
        </Link>
        , learn how to{" "}
        <Link href="https://developers.hubspot.com/docs/platform/create-ui-extensions">
          add a new custom card
        </Link>
        , jump right in with our{" "}
        <Link href="https://developers.hubspot.com/docs/platform/ui-extensions-quickstart">
          Quickstart Guide
        </Link>
        , or check out our{" "}
        <Link href="https://github.com/HubSpot/ui-extensions-react-examples">
          code Samples
        </Link>
        <Divider />
      </Text>
      <Accordion title="About me" defaultOpen={true}>
        <Text>
          Call me Ishmael. Some years ago—never mind how long precisely—having
          little or no money in my purse, and nothing particular to interest me
          on shore, I thought I would sail about a little and see the watery
          part of the world.
        </Text>
      </Accordion> 
      <Accordion title="About this CRM Card">
        <Text>Yeah! That's what I'm talking about!</Text>
      </Accordion>
      
      <Divider>
      </Divider>

      <ButtonRow disableDropdown={false}>
        <Button
          onClick={() => {
            sendAlert({ message: "Regular button clicked"})
            console.log('Regular button clicked');
          }}
        >
          Regular Button
        </Button>
        <Button
          onClick={() => {
            console.log('Reset button clicked');
          }}
          variant="destructive"
          type="reset"
        >
          Reset
        </Button>
        <Button
          onClick={() => {
            console.log('Submit button clicked');
          }}
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </ButtonRow>


    </>
  );
};
