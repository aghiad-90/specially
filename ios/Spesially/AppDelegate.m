#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <Firebase.h>
#import <GoogleMaps/GoogleMaps.h>

#import <Firebase.h>
//#import "RNFirebaseNotifications.h"
//#import "RNFirebaseMessaging.h"

#import <UserNotifications/UserNotifications.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <React/RCTLinkingManager.h>
#import <RNGoogleSignin/RNGoogleSignin.h>
//#import "RNFirebaseLinks.h"
@import GoogleMobileAds;

static NSString *const CUSTOM_URL_SCHEME = @"[REDACTED]";


#if DEBUG
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>


static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
#if DEBUG
  InitializeFlipper(application);
#endif
  
  
  [[GADMobileAds sharedInstance] startWithCompletionHandler:nil];
  [GMSServices provideAPIKey:@"AIzaSyD7HvvWPuPC6h0lo42MPvCANnTHSnf0Jp8"];
  [FIROptions defaultOptions].deepLinkURLScheme = @"com.crowd.spesially";

   [FIRApp configure];
//   [RNFirebaseNotifications configure];
   
   [[FBSDKApplicationDelegate sharedInstance] application:application
                            didFinishLaunchingWithOptions:launchOptions];
   


   [application registerForRemoteNotifications];
   [[UNUserNotificationCenter currentNotificationCenter] setDelegate:self];


  // Setup Notifications
    if ([UNUserNotificationCenter class] != nil) {
      // iOS 10 or later
      // For iOS 10 display notification (sent via APNS)
      [UNUserNotificationCenter currentNotificationCenter].delegate = self;
      UNAuthorizationOptions authOptions = UNAuthorizationOptionAlert |
      UNAuthorizationOptionSound | UNAuthorizationOptionBadge;
      [FIRMessaging messaging].delegate = self;
      [[UNUserNotificationCenter currentNotificationCenter]
       requestAuthorizationWithOptions:authOptions
       completionHandler:^(BOOL granted, NSError * _Nullable error) {
         if (error) { NSLog(@"%@", error); }
       }];
    } else {
      // iOS 10 notifications aren't available; fall back to iOS 8-9 notifications.
      UIUserNotificationType allNotificationTypes =
      (UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge);
      UIUserNotificationSettings *settings =
      [UIUserNotificationSettings settingsForTypes:allNotificationTypes categories:nil];
      [application registerUserNotificationSettings:settings];
    }
  [application registerForRemoteNotifications];
  


  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"Spesially"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  
  
  //in this case when we are faceing white screen after splash screen
  UIView* launchScreenView = [[[NSBundle mainBundle] loadNibNamed:@"LaunchScreen" owner:self options:nil] objectAtIndex:0];
   launchScreenView.frame = self.window.bounds;
   rootView.loadingView = launchScreenView;
  return YES;
}



- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}




//- (void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo
//                                                       fetchCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler{
//  [[RNFirebaseNotifications instance] didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
//}
//
//- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings {
//  [[RNFirebaseMessaging instance] didRegisterUserNotificationSettings:notificationSettings];
//}
//
//- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
//  [[RNFirebaseNotifications instance] didReceiveLocalNotification:notification];
//}



- (void)applicationDidBecomeActive:(UIApplication *)application {
  [FBSDKAppEvents activateApp];
}


- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
  return [[FBSDKApplicationDelegate sharedInstance] application:application
                                                         openURL:url
                                               sourceApplication:sourceApplication
                                                      annotation:annotation];
}





//- (BOOL)application:(UIApplication *)application
//            openURL:(NSURL *)url
//            options:(NSDictionary<NSString *, id> *)options {
//  BOOL handled = [[RNFirebaseLinks instance] application:application openURL:url options:options];

  

//  if (!handled) {
//    handled = [[FBSDKApplicationDelegate sharedInstance] application:application
//                                                             openURL:url
//                                                   sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
//                                                          annotation:options[UIApplicationOpenURLOptionsAnnotationKey]];
//  }

//  if (!handled) {
//    handled = [RCTLinkingManager application:application openURL:url options:options];
//  }
//
//  return handled;
//}
//
//-(BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler {
//  return [[RNFirebaseLinks instance] application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
//}



@end
