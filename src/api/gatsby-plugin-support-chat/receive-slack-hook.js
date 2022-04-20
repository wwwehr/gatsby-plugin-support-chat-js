import { cacheLoad } from "../../utils/cache"

let channelID = process.env.CHANNEL_ID

export default async function handler(req, res) {
    if (req.body.challenge) {
        return res.json({ challenge: req.body.challenge })
    }

    if (
        req.body.event.text != "" &&
        req.body.event.channel == channelID &&
        req.body.event.thread_ts
    ) {
        const thread_ts = req.body.event.thread_ts || req.body.event.event_ts
        const cache = cacheLoad(thread_ts)
        const message = {
            message: req.body.event.text,
            thread_ts,
            timestamp: req.body.event.event_ts,
            user: req.body.event.user,
        }
        cache.setKey(message.timestamp, message)
        cache.save(true)
    }

    return res.send(`ok`)
}
