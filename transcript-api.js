const extractTranscript = response => {
    const transcript =
        response?.actions[0]?.updateEngagementPanelAction?.content?.transcriptRenderer?.body?.transcriptBodyRenderer?.cueGroups
            .map(cueGroup =>
                cueGroup.transcriptCueGroupRenderer.cues
                    .map(cue => cue.transcriptCueRenderer.cue.simpleText.trim())
                    .join(' ')
            )
            .join(' ');

    return transcript;
};

export const getTranscript = async (videoId, key) => {
    key = key || 'AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8'; // tood || =
    if (!videoId) {
        throw Error('Video Id is not provided');
        return;
    }

    const transcriptUrl = `https://www.youtube.com/youtubei/v1/get_transcript?key=${key}`;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            context: {
                client: {
                    clientName: 'WEB',
                    clientVersion: '2.9999099',
                },
            },
            params: btoa(`\n\x0b${videoId}`),
        }),
    };

    try {
        const response = await fetch(transcriptUrl, requestOptions);
        console.log(response);
        const data = await response.json();

        console.log(extractTranscript(data));
    } catch (error) {
        console.log(error);
    }
};
