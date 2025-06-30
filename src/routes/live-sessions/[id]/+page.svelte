<script>
  import { onMount } from 'svelte';
  import { page } from '\$app/stores';

  let liveSession = null;
  let error = null;

  onMount(async () => {
    const sessionId = $page.params.id;
    try {
      const response = await fetch(`/api/live-sessions/${sessionId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      liveSession = await response.json();
    } catch (e) {
      error = e.message;
      console.error('Failed to fetch live session details:', e);
    }
  });
</script>

<main>
  {#if error}
    <p style="color: red;">{error}</p>
  {:else if !liveSession}
    <p>Loading live session details...</p>
  {:else}
    <h1>{liveSession.title}</h1>
    <p><strong>Scheduled At:</strong> {new Date(liveSession.scheduledAt).toLocaleString()}</p>
    <p><strong>Duration:</strong> {liveSession.duration} minutes</p>
    {#if liveSession.meetingLink}
      <p><strong>Join Session:</strong> <a href="{liveSession.meetingLink}" target="_blank">{liveSession.meetingLink}</a></p>
    {:else if liveSession.roomId}
      <p><strong>Room ID:</strong> {liveSession.roomId}</p>
      <p><em>(Future integration with WebRTC or other video conferencing solution)</em></p>
    {:else}
      <p>No meeting link or room ID provided for this session.</p>
    {/if}

    <h2>Live Session Content (Placeholder)</h2>
    <p>This area will contain the embedded video conferencing interface or other interactive elements during the live session.</p>

    {#if liveSession}
      <Chat sessionId={liveSession.id} />
    {/if}
  {/if}
</main>
