import Redis from 'ioredis'
import { redis_channel } from '../constants';

const redis = new Redis.Cluster([], {
    redisOptions: {
        port: 18242,
        host: 'redis-18242.c83.us-east-1-2.ec2.cloud.redislabs.com',
        password: "nL4mM0eLe1WOhKBg1uUivkLEtKFOdInv",
        lazyConnect: true
    }
})

const pub = new Redis({
    port: 18242,
    host: 'redis-18242.c83.us-east-1-2.ec2.cloud.redislabs.com',
    password: "nL4mM0eLe1WOhKBg1uUivkLEtKFOdInv",
    lazyConnect: true
})

const sub = new Redis({
    port: 18242,
    host: 'redis-18242.c83.us-east-1-2.ec2.cloud.redislabs.com',
    password: "nL4mM0eLe1WOhKBg1uUivkLEtKFOdInv",
    lazyConnect: true
})

redis.on('connect', function () {
    console.log('Redis client connected');
});

redis.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

sub.psubscribe(redis_channel['BUSINESS_NOTIF']);

sub.on('pmessage', (pattern , channel, message) => {
    let [type, key] = channel.split(":");
    console.log("A temperature of " + key + " was read in " + type);
});

pub.publish('BUSINESS:hahaaaa', "Ahaha").then(r => {
    console.log(r)
}).catch(err => console.log(err))

export { redis, pub, sub }