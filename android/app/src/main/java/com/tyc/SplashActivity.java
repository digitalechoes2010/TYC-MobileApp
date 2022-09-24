package com.tyc;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import android.view.WindowManager;
import android.os.Build;

import android.content.Intent;
import android.media.MediaPlayer;
import android.media.MediaPlayer.OnCompletionListener;
import android.net.Uri;
import android.widget.VideoView;

public class SplashActivity extends ReactActivity {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		try {
			VideoView videoHolder = (VideoView)this.findViewById(R.id.videoView1);
 			Uri video = Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.splash);
			videoHolder.setVideoURI(video);

			videoHolder.setOnCompletionListener(new OnCompletionListener() {
				public void onCompletion(MediaPlayer mp) {
					jump();
				}
			});
			videoHolder.start();
		} catch (Exception ex) {
			jump();
		}
	}
	private void jump() {
		//it is safe to use this code even if you
		//do not intend to allow users to skip the splash
		if(isFinishing())
			return;
		startActivity(new Intent(this, MainActivity.class));
		finish();
	}
}