export interface Options {
	/**
	Use a HTTPS check using the [icanhazip.com](https://github.com/major/icanhaz) service instead of the DNS query. [ipify.org](https://www.ipify.org) is used as a fallback if `icanhazip.com` fails. This check is much more secure and tamper-proof, but also a lot slower. __This option is only available in the Node.js version__. The default behaviour is to check aginst DNS before using HTTPS fallback. If set to `true`, it will _only_ check against HTTPS.

	@default false
	*/
	readonly onlyHttps?: boolean;

	/**
	The time in milliseconds until a request is considered timed out.

	@default 5000
	*/
	readonly timeout?: number;

	/**
	Add your own custom HTTPS endpoints to get the public IP from. They will only be used if everything else fails. Any service used as fallback _must_ return the IP as a plain string.

	@default []

	@example
	```
	import publicIp = require('public-ip');

	(async () => {
		await publicIp.v6({
			fallbackUrls: [
				'https://ifconfig.co/ip'
			]
		});
	})();
	```
	*/
	readonly fallbackUrls?: readonly string[];
}

export type CancelablePromise<T> = Promise<T> & {
	cancel(): void;
};

/**
Get your public IP address - very fast!

In Node.js, it queries the DNS records of OpenDNS, Google DNS, and HTTPS services to determine your IP address. In browsers, it uses the excellent [icanhaz](https://github.com/major/icanhaz) and [ipify](https://ipify.org) services through HTTPS.

@returns Your public IPv4 address. A `.cancel()` method is available on the promise, which can be used to cancel the request.
@throws On error or timeout.

@example
```
import publicIp = require('public-ip');

(async () => {
	console.log(await publicIp.v4());
	//=> '46.5.21.123'
})();
```
*/
export function v4(options?: Options): CancelablePromise<string>;

/**
Get your public IP address - very fast!

In Node.js, it queries the DNS records of OpenDNS, Google DNS, and HTTPS services to determine your IP address. In browsers, it uses the excellent [icanhaz](https://github.com/major/icanhaz) and [ipify](https://ipify.org) services through HTTPS.

@returns Your public IPv6 address. A `.cancel()` method is available on the promise, which can be used to cancel the request.
@throws On error or timeout.

@example
```
import publicIp = require('public-ip');

(async () => {
	console.log(await publicIp.v6());
	//=> 'fe80::200:f8ff:fe21:67cf'
})();
```
*/
export function v6(options?: Options): CancelablePromise<string>;
