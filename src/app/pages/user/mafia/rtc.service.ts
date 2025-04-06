import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RtcService {
	private peers = new Map<string, RTCPeerConnection>();
	private localStream: MediaStream | null = null;

	async initLocalStream(): Promise<MediaStream> {
		this.localStream = await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: true
		});
		return this.localStream;
	}

	async createPeer(id: string): Promise<RTCPeerConnection> {
		const peer = new RTCPeerConnection();
		this.localStream
			?.getTracks()
			.forEach((track) => peer.addTrack(track, this.localStream!));
		this.peers.set(id, peer);
		return peer;
	}

	getPeer(id: string): RTCPeerConnection | undefined {
		return this.peers.get(id);
	}

	async createOffer(id: string): Promise<RTCSessionDescriptionInit> {
		const peer = this.peers.get(id);
		if (!peer) throw new Error('Peer not found');
		const offer = await peer.createOffer();
		await peer.setLocalDescription(offer);
		return offer;
	}

	async createAnswer(
		id: string,
		offer: RTCSessionDescriptionInit
	): Promise<RTCSessionDescriptionInit> {
		const peer = this.peers.get(id);
		if (!peer) throw new Error('Peer not found');
		await peer.setRemoteDescription(new RTCSessionDescription(offer));
		const answer = await peer.createAnswer();
		await peer.setLocalDescription(answer);
		return answer;
	}

	async setRemoteAnswer(id: string, answer: RTCSessionDescriptionInit) {
		const peer = this.peers.get(id);
		if (!peer) throw new Error('Peer not found');
		await peer.setRemoteDescription(new RTCSessionDescription(answer));
	}

	addIceCandidate(id: string, candidate: RTCIceCandidateInit) {
		const peer = this.peers.get(id);
		if (peer) peer.addIceCandidate(new RTCIceCandidate(candidate));
	}

	getLocalStream(): MediaStream | null {
		return this.localStream;
	}

	closePeer(id: string) {
		const peer = this.peers.get(id);
		if (peer) {
			peer.close();
			this.peers.delete(id);
		}
	}

	closeAll() {
		this.peers.forEach((peer) => peer.close());
		this.peers.clear();
		this.localStream?.getTracks().forEach((track) => track.stop());
		this.localStream = null;
	}
}
