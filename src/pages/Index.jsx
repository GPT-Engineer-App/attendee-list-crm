import React, { useState } from "react";
import { Container, VStack, HStack, Input, Button, Checkbox, Box, Text, SimpleGrid, IconButton } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

const AttendeeList = ({ attendees, toggleArrival, removeAttendee }) => {
  return (
    <VStack spacing={4} align="stretch">
      {attendees.map((attendee, index) => (
        <HStack key={index} spacing={4}>
          <Checkbox isChecked={attendee.arrived} onChange={() => toggleArrival(index)}>
            {attendee.name}
          </Checkbox>
          <IconButton aria-label="Remove" icon={<FaTrash />} onClick={() => removeAttendee(index)} />
        </HStack>
      ))}
    </VStack>
  );
};

const AddAttendee = ({ addAttendee }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== "") {
      addAttendee(name);
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack spacing={4}>
        <Input placeholder="Enter attendee name" value={name} onChange={(e) => setName(e.target.value)} />
        <Button type="submit">Add</Button>
      </HStack>
    </form>
  );
};

const PrintPage = ({ attendees }) => {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={4}>
      {attendees.map((attendee, index) => (
        <Box key={index} p={4} borderWidth="1px" borderRadius="md">
          <Text>{attendee.name}</Text>
        </Box>
      ))}
    </SimpleGrid>
  );
};

const Index = () => {
  const [attendees, setAttendees] = useState([]);

  const addAttendee = (name) => {
    setAttendees([...attendees, { name, arrived: false }]);
  };

  const toggleArrival = (index) => {
    const newAttendees = [...attendees];
    newAttendees[index].arrived = !newAttendees[index].arrived;
    setAttendees(newAttendees);
  };

  const removeAttendee = (index) => {
    const newAttendees = attendees.filter((_, i) => i !== index);
    setAttendees(newAttendees);
  };

  return (
    <Router>
      <Container centerContent maxW="container.md" py={8}>
        <VStack spacing={8} width="100%">
          <HStack spacing={4}>
            <Link to="/">
              <Button>Home</Button>
            </Link>
            <Link to="/print">
              <Button>Print Page</Button>
            </Link>
          </HStack>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <AddAttendee addAttendee={addAttendee} />
                  <AttendeeList attendees={attendees} toggleArrival={toggleArrival} removeAttendee={removeAttendee} />
                </>
              }
            />
            <Route path="/print" element={<PrintPage attendees={attendees} />} />
          </Routes>
        </VStack>
      </Container>
    </Router>
  );
};

export default Index;
