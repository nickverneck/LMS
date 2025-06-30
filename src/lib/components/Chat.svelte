<script>
  import { onMount, onDestroy } from 'svelte';

  export let sessionId; // Prop to identify the live session

  let ws;
  let messages = [];
  let newMessage = '';

  onMount(() => {
    ws = new WebSocket(`ws://localhost:5173/websocket?sessionId=${sessionId}`); // Adjust URL as needed

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      messages = [...messages, event.data];
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  });

  onDestroy(() => {
    if (ws) {
      ws.close();
    }
  });

  function sendMessage() {
    if (ws && ws.readyState === WebSocket.OPEN && newMessage.trim() !== '') {
      ws.send(newMessage);
      newMessage = '';
    }
  }
</script>

<div class="chat-container">
  <div class="messages">
    {#each messages as message}
      <p>{message}</p>
    {/each}
  </div>
  <input type="text" bind:value={newMessage} on:keydown={(e) => e.key === 'Enter' && sendMessage()} placeholder="Type a message...">
  <button on:click={sendMessage}>Send</button>
</div>

<style>
  .chat-container {
    border: 1px solid #ccc;
    padding: 10px;
    height: 300px;
    display: flex;
    flex-direction: column;
  }

  .messages {
    flex-grow: 1;
    overflow-y: auto;
    margin-bottom: 10px;
    border: 1px solid #eee;
    padding: 5px;
  }

  input {
    margin-bottom: 5px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 8px 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
