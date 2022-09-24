package com.tyc;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;
import android.view.WindowManager;
import android.os.Build;

import android.content.Intent;
import android.media.MediaPlayer;
import android.media.MediaPlayer.OnCompletionListener;
import android.net.Uri;
import android.widget.VideoView;

public class MainActivity extends ReactActivity {

	/**
	* Returns the name of the main component registered from JavaScript. This is used to schedule
	* rendering of the component.
	*/
	@Override
	protected String getMainComponentName() {
		return "tyc";
	}
	/*
	* On create instance of main activity
	*/
	@Override
	protected void onCreate(Bundle savedInstanceState){
		// SplashScreen.show(this, R.id.lottie);
		// SplashScreen.setAnimationFinished(true);

		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
			WindowManager.LayoutParams layoutParams = new WindowManager.LayoutParams();
			layoutParams.layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
			getWindow().setAttributes(layoutParams);
			getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
			getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
		}
		super.onCreate(savedInstanceState);
	}
}
