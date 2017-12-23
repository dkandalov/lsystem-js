(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', 'kotlin', 'three'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('kotlin'), require('three'));
  else {
    if (typeof kotlin === 'undefined') {
      throw new Error("Error loading module 'lsystem-js'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'lsystem-js'.");
    }
    if (typeof THREE === 'undefined') {
      throw new Error("Error loading module 'lsystem-js'. Its dependency 'three' was not found. Please, check whether 'three' is loaded prior to 'lsystem-js'.");
    }
    root['lsystem-js'] = factory(typeof this['lsystem-js'] === 'undefined' ? {} : this['lsystem-js'], kotlin, THREE);
  }
}(this, function (_, Kotlin, $module$three) {
  'use strict';
  var $$importsForInline$$ = _.$$importsForInline$$ || (_.$$importsForInline$$ = {});
  var asIterable = Kotlin.kotlin.text.asIterable_gw00vp$;
  var unboxChar = Kotlin.unboxChar;
  var joinToString = Kotlin.kotlin.collections.joinToString_fmv235$;
  var Unit = Kotlin.kotlin.Unit;
  var CoroutineImpl = Kotlin.kotlin.coroutines.experimental.CoroutineImpl;
  var COROUTINE_SUSPENDED = Kotlin.kotlin.coroutines.experimental.intrinsics.COROUTINE_SUSPENDED;
  var buildSequence = Kotlin.kotlin.coroutines.experimental.buildSequence_of7nec$;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var THREE$Vector3 = $module$three.Vector3;
  var THREE$Euler = $module$three.Euler;
  var Pair = Kotlin.kotlin.Pair;
  var take = Kotlin.kotlin.sequences.take_wuwhe2$;
  var last = Kotlin.kotlin.sequences.last_veqyi0$;
  var kotlin_js_internal_DoubleCompanionObject = Kotlin.kotlin.js.internal.DoubleCompanionObject;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var math = Kotlin.kotlin.math;
  var throwUPAE = Kotlin.throwUPAE;
  var throwCCE = Kotlin.throwCCE;
  var THREE$PerspectiveCamera = $module$three.PerspectiveCamera;
  var THREE$Scene = $module$three.Scene;
  var THREE$WebGLRenderer = $module$three.WebGLRenderer;
  var THREE$ShaderPass = $module$three.ShaderPass;
  var THREE$BloomPass = $module$three.BloomPass;
  var THREE$EffectComposer = $module$three.EffectComposer;
  var THREE$RenderPass = $module$three.RenderPass;
  var THREE$Geometry = $module$three.Geometry;
  var THREE$Line = $module$three.Line;
  var THREE$OrbitControls = $module$three.OrbitControls;
  var getCallableRef = Kotlin.getCallableRef;
  var to = Kotlin.kotlin.to_ujzrz7$;
  var mapOf = Kotlin.kotlin.collections.mapOf_qfcya0$;
  var equals = Kotlin.equals;
  var split = Kotlin.kotlin.text.split_ip8yn$;
  var toBoxedChar = Kotlin.toBoxedChar;
  var toDouble = Kotlin.kotlin.text.toDouble_pdl1vz$;
  var toInt = Kotlin.kotlin.text.toInt_pdl1vz$;
  var listOf = Kotlin.kotlin.collections.listOf_i5x0yv$;
  var THREE$Color = $module$three.Color;
  var toList = Kotlin.kotlin.sequences.toList_veqyi0$;
  var take_0 = Kotlin.kotlin.collections.take_ba2ldo$;
  var last_0 = Kotlin.kotlin.collections.last_2p1efm$;
  var first = Kotlin.kotlin.collections.first_2p1efm$;
  var round = Kotlin.kotlin.math.round_14dthe$;
  var THREE$LineBasicMaterial = $module$three.LineBasicMaterial;
  var ensureNotNull = Kotlin.ensureNotNull;
  var defineInlineFunction = Kotlin.defineInlineFunction;
  var mapOf_0 = Kotlin.kotlin.collections.mapOf_x2b85n$;
  function LSystem(axiom, rules) {
    this.axiom = axiom;
    this.rules = rules;
  }
  function LSystem$produce$lambda$lambda(this$LSystem) {
    return function (char) {
      var tmp$;
      return (tmp$ = this$LSystem.rules.get_11rb$(char)) != null ? tmp$ : String.fromCharCode(unboxChar(char));
    };
  }
  function LSystem$produce$lambda(closure$input_0, this$LSystem_0) {
    return function ($receiver_0, continuation_0, suspended) {
      var instance = new Coroutine$LSystem$produce$lambda(closure$input_0, this$LSystem_0, $receiver_0, this, continuation_0);
      if (suspended)
        return instance;
      else
        return instance.doResume(null);
    };
  }
  function Coroutine$LSystem$produce$lambda(closure$input_0, this$LSystem_0, $receiver_0, controller, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.$controller = controller;
    this.exceptionState_0 = 1;
    this.local$closure$input = closure$input_0;
    this.local$this$LSystem = this$LSystem_0;
    this.local$result = void 0;
    this.local$$receiver = $receiver_0;
  }
  Coroutine$LSystem$produce$lambda.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$LSystem$produce$lambda.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$LSystem$produce$lambda.prototype.constructor = Coroutine$LSystem$produce$lambda;
  Coroutine$LSystem$produce$lambda.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            this.local$result = this.local$closure$input;
            this.state_0 = 2;
            continue;
          case 1:
            throw this.exception_0;
          case 2:
            this.state_0 = 3;
            this.result_0 = this.local$$receiver.yield_11rb$(this.local$result, this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            break;
          case 3:
            this.local$result = joinToString(asIterable(this.local$result), '', void 0, void 0, void 0, void 0, LSystem$produce$lambda$lambda(this.local$this$LSystem));
            this.state_0 = 2;
            continue;
        }
      }
       catch (e) {
        if (this.state_0 === 1)
          throw e;
        else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  LSystem.prototype.produce_61zpoe$ = function (input) {
    if (input === void 0)
      input = this.axiom;
    return buildSequence(LSystem$produce$lambda(input, this));
  };
  LSystem.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'LSystem',
    interfaces: []
  };
  var iterator = Kotlin.kotlin.text.iterator_gw00vp$;
  function toPoints$lambda(closure$stepLength_0, closure$angle_0, this$toPoints_0, closure$closedPath_0) {
    return function ($receiver_0, continuation_0, suspended) {
      var instance = new Coroutine$toPoints$lambda(closure$stepLength_0, closure$angle_0, this$toPoints_0, closure$closedPath_0, $receiver_0, this, continuation_0);
      if (suspended)
        return instance;
      else
        return instance.doResume(null);
    };
  }
  function Coroutine$toPoints$lambda(closure$stepLength_0, closure$angle_0, this$toPoints_0, closure$closedPath_0, $receiver_0, controller, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.$controller = controller;
    this.exceptionState_0 = 1;
    this.local$closure$stepLength = closure$stepLength_0;
    this.local$closure$angle = closure$angle_0;
    this.local$this$toPoints = this$toPoints_0;
    this.local$closure$closedPath = closure$closedPath_0;
    this.local$startPoint = void 0;
    this.local$direction = void 0;
    this.local$p = void 0;
    this.local$stack = void 0;
    this.local$tmp$ = void 0;
    this.local$$receiver = $receiver_0;
  }
  Coroutine$toPoints$lambda.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$toPoints$lambda.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$toPoints$lambda.prototype.constructor = Coroutine$toPoints$lambda;
  Coroutine$toPoints$lambda.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            this.local$startPoint = new THREE$Vector3(0, 0, 0);
            this.state_0 = 2;
            this.result_0 = this.local$$receiver.yield_11rb$(this.local$startPoint.clone(), this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            break;
          case 1:
            throw this.exception_0;
          case 2:
            this.local$direction = {v: new THREE$Vector3(0, 0, 0)};
            this.local$p = {v: this.local$startPoint.clone()};
            this.local$stack = [];
            this.local$tmp$ = iterator(this.local$this$toPoints);
            this.state_0 = 3;
            continue;
          case 3:
            if (!this.local$tmp$.hasNext()) {
              this.state_0 = 16;
              continue;
            }

            var element = unboxChar(this.local$tmp$.next());
            var closure$stepLength = this.local$closure$stepLength;
            var closure$angle = this.local$closure$angle;
            var tmp$;
            tmp$ = unboxChar(toBoxedChar(element));
            if (tmp$ === 70 || tmp$ === 71 || tmp$ === 72 || tmp$ === 73) {
              var v = new THREE$Vector3(0, closure$stepLength, 0);
              v.applyEuler(new THREE$Euler(this.local$direction.v.x, this.local$direction.v.y, this.local$direction.v.z, 'XYZ'));
              this.local$p.v.add(v);
              this.state_0 = 14;
              this.result_0 = this.local$$receiver.yield_11rb$(this.local$p.v.clone(), this);
              if (this.result_0 === COROUTINE_SUSPENDED)
                return COROUTINE_SUSPENDED;
              break;
            }
             else {
              if (tmp$ === 43) {
                this.local$direction.v.z = this.local$direction.v.z + closure$angle;
                this.state_0 = 13;
                continue;
              }
               else {
                if (tmp$ === 45) {
                  this.local$direction.v.z = this.local$direction.v.z - closure$angle;
                  this.state_0 = 12;
                  continue;
                }
                 else {
                  if (tmp$ === 60) {
                    this.local$direction.v.x = this.local$direction.v.x + closure$angle;
                    this.state_0 = 11;
                    continue;
                  }
                   else {
                    if (tmp$ === 62) {
                      this.local$direction.v.x = this.local$direction.v.x - closure$angle;
                      this.state_0 = 10;
                      continue;
                    }
                     else {
                      if (tmp$ === 124) {
                        this.local$direction.v.x = this.local$direction.v.x - closure$angle * 2;
                        this.state_0 = 9;
                        continue;
                      }
                       else {
                        if (tmp$ === 94) {
                          this.local$direction.v.y = this.local$direction.v.y + closure$angle;
                          this.state_0 = 8;
                          continue;
                        }
                         else {
                          if (tmp$ === 38) {
                            this.local$direction.v.y = this.local$direction.v.y - closure$angle;
                            this.state_0 = 7;
                            continue;
                          }
                           else {
                            if (tmp$ === 91) {
                              this.local$stack.push(new Pair(this.local$p.v.clone(), this.local$direction.v.clone()));
                              this.state_0 = 6;
                              continue;
                            }
                             else {
                              if (tmp$ === 93) {
                                var removed = this.local$stack.pop();
                                this.local$p.v = removed.first;
                                this.local$direction.v = removed.second;
                                this.state_0 = 4;
                                this.result_0 = this.local$$receiver.yield_11rb$(LSystem3d$Companion_getInstance().emptyVector, this);
                                if (this.result_0 === COROUTINE_SUSPENDED)
                                  return COROUTINE_SUSPENDED;
                                break;
                              }
                               else {
                                this.state_0 = 5;
                                continue;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }

          case 4:
            this.state_0 = 5;
            continue;
          case 5:
            this.state_0 = 6;
            continue;
          case 6:
            this.state_0 = 7;
            continue;
          case 7:
            this.state_0 = 8;
            continue;
          case 8:
            this.state_0 = 9;
            continue;
          case 9:
            this.state_0 = 10;
            continue;
          case 10:
            this.state_0 = 11;
            continue;
          case 11:
            this.state_0 = 12;
            continue;
          case 12:
            this.state_0 = 13;
            continue;
          case 13:
            this.state_0 = 15;
            continue;
          case 14:
            this.state_0 = 15;
            continue;
          case 15:
            this.state_0 = 3;
            continue;
          case 16:
            if (this.local$closure$closedPath) {
              this.state_0 = 17;
              this.result_0 = this.local$$receiver.yield_11rb$(this.local$startPoint.clone(), this);
              if (this.result_0 === COROUTINE_SUSPENDED)
                return COROUTINE_SUSPENDED;
              break;
            }
             else {
              this.state_0 = 18;
              continue;
            }

          case 17:
            return Unit;
          case 18:
            return Unit;
        }
      }
       catch (e) {
        if (this.state_0 === 1)
          throw e;
        else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  function toPoints($receiver, angle, stepLength, closedPath) {
    if (stepLength === void 0)
      stepLength = 10.0;
    if (closedPath === void 0)
      closedPath = false;
    return buildSequence(toPoints$lambda(stepLength, angle, $receiver, closedPath));
  }
  function LSystem3d(axiom, rules, angle, closedPath, stepLength) {
    LSystem3d$Companion_getInstance();
    if (closedPath === void 0)
      closedPath = false;
    if (stepLength === void 0)
      stepLength = 10.0;
    this.axiom = axiom;
    this.rules = rules;
    this.angle = angle;
    this.closedPath = closedPath;
    this.stepLength = stepLength;
  }
  LSystem3d.prototype.generatePoints_za3lpa$ = function (iterations) {
    if (iterations === void 0)
      iterations = 3;
    return this.toPoints_0(last(take((new LSystem(this.axiom, this.rules)).produce_61zpoe$(), iterations + 1 | 0)), this.stepLength);
  };
  function LSystem3d$toPoints$lambda(closure$stepLength_0, this$LSystem3d_0, this$toPoints_0) {
    return function ($receiver_0, continuation_0, suspended) {
      var instance = new Coroutine$LSystem3d$toPoints$lambda(closure$stepLength_0, this$LSystem3d_0, this$toPoints_0, $receiver_0, this, continuation_0);
      if (suspended)
        return instance;
      else
        return instance.doResume(null);
    };
  }
  function Coroutine$LSystem3d$toPoints$lambda(closure$stepLength_0, this$LSystem3d_0, this$toPoints_0, $receiver_0, controller, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.$controller = controller;
    this.exceptionState_0 = 1;
    this.local$closure$stepLength = closure$stepLength_0;
    this.local$this$LSystem3d = this$LSystem3d_0;
    this.local$this$toPoints = this$toPoints_0;
    this.local$startPoint = void 0;
    this.local$angles = void 0;
    this.local$p = void 0;
    this.local$stack = void 0;
    this.local$tmp$ = void 0;
    this.local$$receiver = $receiver_0;
  }
  Coroutine$LSystem3d$toPoints$lambda.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$LSystem3d$toPoints$lambda.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$LSystem3d$toPoints$lambda.prototype.constructor = Coroutine$LSystem3d$toPoints$lambda;
  Coroutine$LSystem3d$toPoints$lambda.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            this.local$startPoint = new THREE$Vector3(0, 0, 0);
            this.state_0 = 2;
            this.result_0 = this.local$$receiver.yield_11rb$(this.local$startPoint.clone(), this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            break;
          case 1:
            throw this.exception_0;
          case 2:
            this.local$angles = {v: new THREE$Vector3(0, 0, 0)};
            this.local$p = {v: this.local$startPoint.clone()};
            this.local$stack = [];
            this.local$tmp$ = iterator(this.local$this$toPoints);
            this.state_0 = 3;
            continue;
          case 3:
            if (!this.local$tmp$.hasNext()) {
              this.state_0 = 16;
              continue;
            }

            var element = unboxChar(this.local$tmp$.next());
            var closure$stepLength = this.local$closure$stepLength;
            var this$LSystem3d = this.local$this$LSystem3d;
            var tmp$;
            tmp$ = unboxChar(toBoxedChar(element));
            if (tmp$ === 70 || tmp$ === 71 || tmp$ === 72 || tmp$ === 73) {
              var v = new THREE$Vector3(0, closure$stepLength, 0);
              v.applyEuler(new THREE$Euler(this.local$angles.v.x, this.local$angles.v.y, this.local$angles.v.z, 'XYZ'));
              this.local$p.v.add(v);
              this.state_0 = 14;
              this.result_0 = this.local$$receiver.yield_11rb$(this.local$p.v.clone(), this);
              if (this.result_0 === COROUTINE_SUSPENDED)
                return COROUTINE_SUSPENDED;
              break;
            }
             else {
              if (tmp$ === 43) {
                this.local$angles.v.z = this.local$angles.v.z + this$LSystem3d.angle;
                this.state_0 = 13;
                continue;
              }
               else {
                if (tmp$ === 45) {
                  this.local$angles.v.z = this.local$angles.v.z - this$LSystem3d.angle;
                  this.state_0 = 12;
                  continue;
                }
                 else {
                  if (tmp$ === 60) {
                    this.local$angles.v.x = this.local$angles.v.x + this$LSystem3d.angle;
                    this.state_0 = 11;
                    continue;
                  }
                   else {
                    if (tmp$ === 62) {
                      this.local$angles.v.x = this.local$angles.v.x - this$LSystem3d.angle;
                      this.state_0 = 10;
                      continue;
                    }
                     else {
                      if (tmp$ === 124) {
                        this.local$angles.v.x = this.local$angles.v.x - this$LSystem3d.angle * 2;
                        this.state_0 = 9;
                        continue;
                      }
                       else {
                        if (tmp$ === 94) {
                          this.local$angles.v.y = this.local$angles.v.y + this$LSystem3d.angle;
                          this.state_0 = 8;
                          continue;
                        }
                         else {
                          if (tmp$ === 38) {
                            this.local$angles.v.y = this.local$angles.v.y - this$LSystem3d.angle;
                            this.state_0 = 7;
                            continue;
                          }
                           else {
                            if (tmp$ === 91) {
                              this.local$stack.push(new Pair(this.local$p.v.clone(), this.local$angles.v.clone()));
                              this.state_0 = 6;
                              continue;
                            }
                             else {
                              if (tmp$ === 93) {
                                var removed = this.local$stack.pop();
                                this.local$p.v = removed.first;
                                this.local$angles.v = removed.second;
                                this.state_0 = 4;
                                this.result_0 = this.local$$receiver.yield_11rb$(LSystem3d$Companion_getInstance().emptyVector, this);
                                if (this.result_0 === COROUTINE_SUSPENDED)
                                  return COROUTINE_SUSPENDED;
                                break;
                              }
                               else {
                                this.state_0 = 5;
                                continue;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }

          case 4:
            this.state_0 = 5;
            continue;
          case 5:
            this.state_0 = 6;
            continue;
          case 6:
            this.state_0 = 7;
            continue;
          case 7:
            this.state_0 = 8;
            continue;
          case 8:
            this.state_0 = 9;
            continue;
          case 9:
            this.state_0 = 10;
            continue;
          case 10:
            this.state_0 = 11;
            continue;
          case 11:
            this.state_0 = 12;
            continue;
          case 12:
            this.state_0 = 13;
            continue;
          case 13:
            this.state_0 = 15;
            continue;
          case 14:
            this.state_0 = 15;
            continue;
          case 15:
            this.state_0 = 3;
            continue;
          case 16:
            if (this.local$this$LSystem3d.closedPath) {
              this.state_0 = 17;
              this.result_0 = this.local$$receiver.yield_11rb$(this.local$startPoint.clone(), this);
              if (this.result_0 === COROUTINE_SUSPENDED)
                return COROUTINE_SUSPENDED;
              break;
            }
             else {
              this.state_0 = 18;
              continue;
            }

          case 17:
            return Unit;
          case 18:
            return Unit;
        }
      }
       catch (e) {
        if (this.state_0 === 1)
          throw e;
        else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  LSystem3d.prototype.toPoints_0 = function ($receiver, stepLength) {
    return buildSequence(LSystem3d$toPoints$lambda(stepLength, this, $receiver));
  };
  function LSystem3d$Companion() {
    LSystem3d$Companion_instance = this;
    this.emptyVector = new THREE$Vector3(kotlin_js_internal_DoubleCompanionObject.NaN, kotlin_js_internal_DoubleCompanionObject.NaN, kotlin_js_internal_DoubleCompanionObject.NaN);
  }
  LSystem3d$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var LSystem3d$Companion_instance = null;
  function LSystem3d$Companion_getInstance() {
    if (LSystem3d$Companion_instance === null) {
      new LSystem3d$Companion();
    }
    return LSystem3d$Companion_instance;
  }
  LSystem3d.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'LSystem3d',
    interfaces: []
  };
  function toRadians($receiver) {
    return toRadians_0($receiver);
  }
  function toDegrees($receiver) {
    return $receiver / math.PI * 180;
  }
  function toRadians_0($receiver) {
    return $receiver / 180 * math.PI;
  }
  function toXYZString($receiver) {
    return $receiver.x.toString() + ' ' + $receiver.y + ' ' + $receiver.z;
  }
  function main(window_0, document) {
    var $receiver = new WebUI(window_0, document);
    $receiver.init();
    $receiver.animate_14dthe$();
  }
  function WebUI(window_0, document) {
    this.window = window_0;
    this.document = document;
    this.camera_wd379g$_0 = this.camera_wd379g$_0;
    this.scene_2lulix$_0 = this.scene_2lulix$_0;
    this.renderer_otbw2q$_0 = this.renderer_otbw2q$_0;
    this.composer_7cvly7$_0 = this.composer_7cvly7$_0;
    this.windowHalfX = this.window.innerWidth / 2.0;
    this.windowHalfY = this.window.innerHeight / 2.0;
    this.material1 = new THREE$LineBasicMaterial(applyDynamic(new WebUI$material1$ObjectLiteral(), WebUI$material1$lambda));
    this.material2 = new THREE$LineBasicMaterial(applyDynamic(new WebUI$material2$ObjectLiteral(), WebUI$material2$lambda));
    this.lineMaterial = this.material1;
  }
  Object.defineProperty(WebUI.prototype, 'camera', {
    get: function () {
      if (this.camera_wd379g$_0 == null)
        return throwUPAE('camera');
      return this.camera_wd379g$_0;
    },
    set: function (camera) {
      this.camera_wd379g$_0 = camera;
    }
  });
  Object.defineProperty(WebUI.prototype, 'scene', {
    get: function () {
      if (this.scene_2lulix$_0 == null)
        return throwUPAE('scene');
      return this.scene_2lulix$_0;
    },
    set: function (scene) {
      this.scene_2lulix$_0 = scene;
    }
  });
  Object.defineProperty(WebUI.prototype, 'renderer', {
    get: function () {
      if (this.renderer_otbw2q$_0 == null)
        return throwUPAE('renderer');
      return this.renderer_otbw2q$_0;
    },
    set: function (renderer) {
      this.renderer_otbw2q$_0 = renderer;
    }
  });
  Object.defineProperty(WebUI.prototype, 'composer', {
    get: function () {
      if (this.composer_7cvly7$_0 == null)
        return throwUPAE('composer');
      return this.composer_7cvly7$_0;
    },
    set: function (composer) {
      this.composer_7cvly7$_0 = composer;
    }
  });
  function WebUI$init$lambda$lambda(closure$child) {
    return function (f) {
      closure$child.focus();
      return Unit;
    };
  }
  function WebUI$init$lambda(this$WebUI) {
    return function ($receiver) {
      $receiver.uniforms['resolution'].value.set(1.0 / this$WebUI.window.innerWidth, 1.0 / this$WebUI.window.innerHeight);
      return Unit;
    };
  }
  function WebUI$init$lambda_0($receiver) {
    $receiver.renderToScreen = true;
    return Unit;
  }
  function WebUI$init$generateScene(this$WebUI, closure$presenter) {
    return function () {
      this$WebUI.clear_0(this$WebUI.scene);
      var geometry = {v: new THREE$Geometry()};
      var $receiver = closure$presenter.generatePoints();
      var tmp$;
      tmp$ = $receiver.iterator();
      while (tmp$.hasNext()) {
        var element = tmp$.next();
        var this$WebUI_0 = this$WebUI;
        if (element === LSystem3d$Companion_getInstance().emptyVector) {
          this$WebUI_0.scene.add(new THREE$Line(geometry.v, this$WebUI_0.lineMaterial));
          geometry.v = new THREE$Geometry();
        }
         else {
          geometry.v.vertices.push(element);
        }
      }
      if (!(geometry.v.vertices.length === 0)) {
        this$WebUI.scene.add(new THREE$Line(geometry.v, this$WebUI.lineMaterial));
      }
      this$WebUI.render_0();
    };
  }
  WebUI.prototype.init = function () {
    var tmp$;
    var container = Kotlin.isType(tmp$ = this.document.getElementById('content'), Node) ? tmp$ : throwCCE();
    this.camera = new THREE$PerspectiveCamera(33.0, this.window.innerWidth / this.window.innerHeight, 1.0, 10000.0);
    this.camera.position.set(0, 0, 400);
    this.scene = new THREE$Scene();
    var $receiver = new THREE$WebGLRenderer();
    var tmp$_0;
    $receiver.setPixelRatio(this.window.devicePixelRatio);
    $receiver.setSize(this.window.innerWidth, this.window.innerHeight);
    var child = Kotlin.isType(tmp$_0 = container.appendChild($receiver.domElement), HTMLElement) ? tmp$_0 : throwCCE();
    child.setAttribute('tabindex', '0');
    child.addEventListener('click', WebUI$init$lambda$lambda(child));
    this.renderer = $receiver;
    this.applyTheme2_0();
    var effectFXAA = applyDynamic(new THREE$ShaderPass($module$three.FXAAShader), WebUI$init$lambda(this));
    var effectBloom = new THREE$BloomPass(1.3);
    var effectCopy = applyDynamic(new THREE$ShaderPass($module$three.CopyShader), WebUI$init$lambda_0);
    this.composer = new THREE$EffectComposer(this.renderer);
    this.composer.addPass(new THREE$RenderPass(this.scene, this.camera));
    this.composer.addPass(effectCopy);
    var presenter = new WebUI$LSystem3dPresenter();
    var generateScene = WebUI$init$generateScene(this, presenter);
    generateScene();
    var orbitControls = new THREE$OrbitControls(this.camera, this.renderer.domElement);
    orbitControls.keyPanSpeed = 0.0;
    this.initConfigToolbar_0(presenter, getCallableRef('generateScene', function () {
      return generateScene(), Unit;
    }));
    this.updateConfigToolbar_0(presenter);
    this.window.addEventListener('resize', getCallableRef('onWindowResize', function ($receiver, event) {
      return $receiver.onWindowResize_0(event), Unit;
    }.bind(null, this)), false);
    this.window.addEventListener('keypress', this.onKeyPress_0(presenter, orbitControls, getCallableRef('generateScene', function () {
      return generateScene(), Unit;
    })));
  };
  WebUI.prototype.clear_0 = function ($receiver) {
    while ($receiver.children.length > 0) {
      var children = $receiver.children;
      $receiver.remove(children[0]);
    }
  };
  function WebUI$onKeyPress$lambda(closure$presenter) {
    return function () {
      closure$presenter.switch_za3lpa$(1);
      return Unit;
    };
  }
  function WebUI$onKeyPress$lambda_0(closure$presenter) {
    return function () {
      closure$presenter.switch_za3lpa$(-1);
      return Unit;
    };
  }
  function WebUI$onKeyPress$lambda_1(closure$presenter) {
    return function () {
      closure$presenter.changeIterationCount_za3lpa$(1);
      return Unit;
    };
  }
  function WebUI$onKeyPress$lambda_2(closure$presenter) {
    return function () {
      closure$presenter.changeIterationCount_za3lpa$(-1);
      return Unit;
    };
  }
  function WebUI$onKeyPress$lambda_3(closure$presenter) {
    return function () {
      closure$presenter.changeAngle_14dthe$(toRadians(5));
      return Unit;
    };
  }
  function WebUI$onKeyPress$lambda_4(closure$presenter) {
    return function () {
      closure$presenter.changeAngle_14dthe$(toRadians(-5));
      return Unit;
    };
  }
  function WebUI$onKeyPress$lambda_5(closure$orbitControls) {
    return function () {
      closure$orbitControls.reset();
      return Unit;
    };
  }
  function WebUI$onKeyPress$lambda_6(this$WebUI) {
    return function () {
      this$WebUI.applyTheme1_0();
      return Unit;
    };
  }
  function WebUI$onKeyPress$lambda_7(this$WebUI) {
    return function () {
      this$WebUI.applyTheme2_0();
      return Unit;
    };
  }
  function WebUI$onKeyPress$lambda_8(this$WebUI, closure$presenter) {
    return function () {
      var tmp$, tmp$_0;
      return (tmp$_0 = this$WebUI.window.open((tmp$ = closure$presenter.lSystem.url) != null ? tmp$ : '')) != null ? (tmp$_0.focus(), Unit) : null;
    };
  }
  function WebUI$onKeyPress$lambda_9(this$WebUI, closure$mapping, closure$updateUI, closure$presenter) {
    return function (event) {
      if (Kotlin.isType(event, KeyboardEvent)) {
        if (equals(event.key, '`')) {
          this$WebUI.toggleConfigToolbar_5oryg$(this$WebUI.document);
        }
        if (!Kotlin.isType(event.target, HTMLInputElement)) {
          var action = closure$mapping.get_11rb$(event.key);
          if (action != null) {
            action();
            closure$updateUI();
            this$WebUI.updateConfigToolbar_0(closure$presenter);
          }
        }
      }
      return Unit;
    };
  }
  WebUI.prototype.onKeyPress_0 = function (presenter, orbitControls, updateUI) {
    var mapping = mapOf([to('n', WebUI$onKeyPress$lambda(presenter)), to('N', WebUI$onKeyPress$lambda_0(presenter)), to('i', WebUI$onKeyPress$lambda_1(presenter)), to('I', WebUI$onKeyPress$lambda_2(presenter)), to('a', WebUI$onKeyPress$lambda_3(presenter)), to('A', WebUI$onKeyPress$lambda_4(presenter)), to('c', WebUI$onKeyPress$lambda_5(orbitControls)), to('q', WebUI$onKeyPress$lambda_6(this)), to('w', WebUI$onKeyPress$lambda_7(this)), to('u', WebUI$onKeyPress$lambda_8(this, presenter))]);
    return WebUI$onKeyPress$lambda_9(this, mapping, updateUI, presenter);
  };
  var collectionSizeOrDefault = Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  var mapCapacity = Kotlin.kotlin.collections.mapCapacity_za3lpa$;
  var coerceAtLeast = Kotlin.kotlin.ranges.coerceAtLeast_dqglrj$;
  var LinkedHashMap_init = Kotlin.kotlin.collections.LinkedHashMap_init_xf5xz2$;
  function WebUI$initConfigToolbar$applyChanges(this$WebUI, closure$presenter, closure$updateUI) {
    return function () {
      closure$presenter.lSystem.value.axiom = this$WebUI.inputById_61zpoe$('axiom').value;
      var tmp$ = closure$presenter.lSystem.value;
      var $receiver = split(this$WebUI.inputById_61zpoe$('rules').value, ['; ']);
      var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
      var tmp$_0;
      tmp$_0 = $receiver.iterator();
      while (tmp$_0.hasNext()) {
        var item = tmp$_0.next();
        destination.add_11rb$(split(item, [' => ']));
      }
      var capacity = coerceAtLeast(mapCapacity(collectionSizeOrDefault(destination, 10)), 16);
      var destination_0 = LinkedHashMap_init(capacity);
      var tmp$_1;
      tmp$_1 = destination.iterator();
      while (tmp$_1.hasNext()) {
        var element = tmp$_1.next();
        var pair = new Pair(toBoxedChar(element.get_za3lpa$(0).charCodeAt(0)), element.get_za3lpa$(1));
        destination_0.put_xwzc9p$(pair.first, pair.second);
      }
      tmp$.rules = destination_0;
      closure$presenter.lSystem.value.angle = toRadians_0(toDouble(this$WebUI.inputById_61zpoe$('angle').value));
      closure$presenter.lSystem.iterations = toInt(this$WebUI.inputById_61zpoe$('iterations').value);
      closure$updateUI();
    };
  }
  function WebUI$initConfigToolbar$lambda$lambda(closure$applyChanges) {
    return function (f) {
      closure$applyChanges();
      return Unit;
    };
  }
  WebUI.prototype.initConfigToolbar_0 = function (presenter, updateUI) {
    var applyChanges = WebUI$initConfigToolbar$applyChanges(this, presenter, updateUI);
    var tmp$;
    tmp$ = listOf([this.inputById_61zpoe$('axiom'), this.inputById_61zpoe$('rules'), this.inputById_61zpoe$('angle'), this.inputById_61zpoe$('iterations')]).iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      element.addEventListener('change', WebUI$initConfigToolbar$lambda$lambda(applyChanges));
    }
  };
  function WebUI$updateConfigToolbar$lambda(it) {
    var $receiver = unboxChar(it.key);
    return String.fromCharCode($receiver) + ' => ' + it.value;
  }
  WebUI.prototype.updateConfigToolbar_0 = function (presenter) {
    this.inputById_61zpoe$('title').value = presenter.lSystem.title;
    this.inputById_61zpoe$('axiom').value = presenter.lSystem.value.axiom;
    this.inputById_61zpoe$('rules').value = joinToString(presenter.lSystem.value.rules.entries, '; ', void 0, void 0, void 0, void 0, WebUI$updateConfigToolbar$lambda);
    this.inputById_61zpoe$('angle').value = toDegrees(presenter.lSystem.value.angle).toString();
    this.inputById_61zpoe$('iterations').value = presenter.lSystem.iterations.toString();
  };
  WebUI.prototype.applyTheme1_0 = function () {
    var tmp$, tmp$_0;
    this.lineMaterial = this.material1;
    this.scene.background = new THREE$Color(16777215);
    (tmp$_0 = (tmp$ = this.document.body) != null ? tmp$.style : null) != null ? (tmp$_0.background = '#ffffff') : null;
  };
  WebUI.prototype.applyTheme2_0 = function () {
    var tmp$, tmp$_0;
    this.lineMaterial = this.material2;
    this.scene.background = new THREE$Color(0);
    (tmp$_0 = (tmp$ = this.document.body) != null ? tmp$.style : null) != null ? (tmp$_0.background = '#000000') : null;
  };
  WebUI.prototype.animate_14dthe$ = function (d) {
    if (d === void 0)
      d = 0.0;
    this.window.requestAnimationFrame(getCallableRef('animate', function ($receiver, d) {
      return $receiver.animate_14dthe$(d), Unit;
    }.bind(null, this)));
    this.render_0();
  };
  WebUI.prototype.render_0 = function () {
    this.composer.render();
  };
  WebUI.prototype.onWindowResize_0 = function (event) {
    this.windowHalfX = this.window.innerWidth / 2.0;
    this.windowHalfY = this.window.innerHeight / 2.0;
    this.camera.aspect = this.window.innerWidth / this.window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.window.innerWidth, this.window.innerHeight);
  };
  function WebUI$LSystem3dPresenter() {
    this.lSystems_0 = listOf([new WebUI$LSystem3dPresenter$ConfigurableLSystem(kochSnowflake, void 0, 'Koch snowflake', 'https://en.wikipedia.org/wiki/Koch_snowflake'), new WebUI$LSystem3dPresenter$ConfigurableLSystem(cesaroFractal, void 0, 'Cesaro fractal', 'http://mathworld.wolfram.com/CesaroFractal.html'), new WebUI$LSystem3dPresenter$ConfigurableLSystem(quadraticType2Curve, void 0, 'Quadratic type 2', 'https://en.wikipedia.org/wiki/Koch_snowflake#Variants_of_the_Koch_curve'), new WebUI$LSystem3dPresenter$ConfigurableLSystem(hilbertCurve, void 0, 'Hilbert curve', 'https://en.wikipedia.org/wiki/Hilbert_curve'), new WebUI$LSystem3dPresenter$ConfigurableLSystem(lindenmayerCurve, void 0, 'Lindenmayer curve'), new WebUI$LSystem3dPresenter$ConfigurableLSystem(gosperCurve, void 0, 'Gosper curve', 'https://en.wikipedia.org/wiki/Gosper_curve'), new WebUI$LSystem3dPresenter$ConfigurableLSystem(sierpinskiTriangle, void 0, 'Sierpinski triangle', 'https://en.wikipedia.org/wiki/Sierpinski_triangle'), new WebUI$LSystem3dPresenter$ConfigurableLSystem(sierpinskiArrowheadCurve, void 0, 'Sierpinski arrow head triangle', 'https://en.wikipedia.org/wiki/Sierpi%C5%84ski_arrowhead_curve'), new WebUI$LSystem3dPresenter$ConfigurableLSystem(dragonCurve, 14, 'Dragon curve', 'https://en.wikipedia.org/wiki/Dragon_curve'), new WebUI$LSystem3dPresenter$ConfigurableLSystem(fractalPlant, void 0, 'Plant', 'https://en.wikipedia.org/wiki/L-system#Example_7:_Fractal_plant'), new WebUI$LSystem3dPresenter$ConfigurableLSystem(kochCurve3d, void 0, 'Koch curve 3d', 'https://github.com/Hiestaa/3D-Lsystem/blob/master/lsystem/KochCurve3D.py')]);
    this.lSystem = first(this.lSystems_0);
    this.debugMode = false;
    this.debugStepSize_0 = 1;
  }
  WebUI$LSystem3dPresenter.prototype.generatePoints = function () {
    var points = fitCenteredInto(toList(this.lSystem.value.generatePoints_za3lpa$(this.lSystem.iterations)), -100.0, -100.0, -100.0, 100.0, 100.0, 100.0);
    return this.debugMode ? take_0(points, this.debugStepSize_0) : points;
  };
  WebUI$LSystem3dPresenter.prototype.switch_za3lpa$ = function (direction) {
    var tmp$;
    var $receiver = this.lSystems_0;
    var indexOfFirst$result;
    indexOfFirst$break: do {
      var tmp$_0;
      var index = 0;
      tmp$_0 = $receiver.iterator();
      while (tmp$_0.hasNext()) {
        var item = tmp$_0.next();
        if (equals(item.value, this.lSystem.value)) {
          indexOfFirst$result = index;
          break indexOfFirst$break;
        }
        index = index + 1 | 0;
      }
      indexOfFirst$result = -1;
    }
     while (false);
    var i = indexOfFirst$result + direction | 0;
    if (i < 0)
      tmp$ = last_0(this.lSystems_0);
    else if (i >= this.lSystems_0.size)
      tmp$ = first(this.lSystems_0);
    else
      tmp$ = this.lSystems_0.get_za3lpa$(i);
    this.lSystem = tmp$;
    this.debugMode = false;
    this.debugStepSize_0 = 0;
  };
  WebUI$LSystem3dPresenter.prototype.changeIterationCount_za3lpa$ = function (increment) {
    var tmp$;
    tmp$ = this.lSystem;
    tmp$.iterations = tmp$.iterations + increment | 0;
    if (this.lSystem.iterations > this.lSystem.maxIterations) {
      this.lSystem.iterations = this.lSystem.maxIterations;
    }
    if (this.lSystem.iterations <= 0) {
      this.lSystem.iterations = 0;
    }
  };
  WebUI$LSystem3dPresenter.prototype.increaseDebugStep = function () {
    if (this.debugMode) {
      this.debugStepSize_0 = this.debugStepSize_0 + 1 | 0;
    }
  };
  WebUI$LSystem3dPresenter.prototype.decreaseDebugStep = function () {
    if (this.debugMode) {
      this.debugStepSize_0 = this.debugStepSize_0 - 1 | 0;
    }
  };
  WebUI$LSystem3dPresenter.prototype.changeAngle_14dthe$ = function (value) {
    var $receiver = this.lSystem.value;
    $receiver.angle = toRadians_0(round(toDegrees($receiver.angle + value)));
    if ($receiver.angle < 0)
      $receiver.angle += 2 * math.PI;
    if ($receiver.angle > 2 * math.PI)
      $receiver.angle -= 2 * math.PI;
  };
  function WebUI$LSystem3dPresenter$ConfigurableLSystem(value, maxIterations, title, url) {
    if (maxIterations === void 0)
      maxIterations = 9;
    if (title === void 0)
      title = '';
    if (url === void 0)
      url = null;
    this.value = value;
    this.maxIterations = maxIterations;
    this.title = title;
    this.url = url;
    this.iterations = 1;
  }
  WebUI$LSystem3dPresenter$ConfigurableLSystem.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ConfigurableLSystem',
    interfaces: []
  };
  WebUI$LSystem3dPresenter.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'LSystem3dPresenter',
    interfaces: []
  };
  WebUI.prototype.toggleConfigToolbar_5oryg$ = function (document) {
    var tmp$;
    var element = Kotlin.isType(tmp$ = document.getElementById('config-toolbar'), HTMLDivElement) ? tmp$ : throwCCE();
    if (equals(element.style.display, 'none')) {
      element.style.display = '';
    }
     else {
      element.style.display = 'none';
    }
  };
  WebUI.prototype.inputById_61zpoe$ = function (id) {
    var tmp$;
    return Kotlin.isType(tmp$ = this.document.getElementById(id), HTMLInputElement) ? tmp$ : throwCCE();
  };
  function WebUI$material1$ObjectLiteral() {
  }
  WebUI$material1$ObjectLiteral.$metadata$ = {
    kind: Kind_CLASS,
    interfaces: []
  };
  function WebUI$material1$lambda($receiver) {
    $receiver.color = 0;
    $receiver.linewidth = 5.0;
    $receiver.opacity = 1.0;
    $receiver.blending = $module$three.AdditiveBlending;
    $receiver.transparent = false;
    return Unit;
  }
  function WebUI$material2$ObjectLiteral() {
  }
  WebUI$material2$ObjectLiteral.$metadata$ = {
    kind: Kind_CLASS,
    interfaces: []
  };
  function WebUI$material2$lambda($receiver) {
    $receiver.color = 16777215;
    $receiver.opacity = 1.0;
    $receiver.blending = $module$three.AdditiveBlending;
    $receiver.transparent = false;
    return Unit;
  }
  WebUI.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'WebUI',
    interfaces: []
  };
  var IllegalArgumentException_init = Kotlin.kotlin.IllegalArgumentException;
  var Math_0 = Math;
  function fitCenteredInto($receiver, x1, y1, z1, x2, y2, z2) {
    if (!(x1 < x2 && y1 < y2 && z1 < z2)) {
      var message = 'Failed requirement.';
      throw new IllegalArgumentException_init(message.toString());
    }
    var width = x2 - x1;
    var height = y2 - y1;
    var depth = z2 - z1;
    var minBy$result;
    minBy$break: do {
      var iterator = $receiver.iterator();
      if (!iterator.hasNext()) {
        minBy$result = null;
        break minBy$break;
      }
      var minElem = iterator.next();
      var minValue = minElem.x;
      while (iterator.hasNext()) {
        var e = iterator.next();
        var v = e.x;
        if (Kotlin.compareTo(minValue, v) > 0) {
          minElem = e;
          minValue = v;
        }
      }
      minBy$result = minElem;
    }
     while (false);
    var tmp$ = ensureNotNull(minBy$result).x;
    var minBy$result_0;
    minBy$break: do {
      var iterator_0 = $receiver.iterator();
      if (!iterator_0.hasNext()) {
        minBy$result_0 = null;
        break minBy$break;
      }
      var minElem_0 = iterator_0.next();
      var minValue_0 = minElem_0.y;
      while (iterator_0.hasNext()) {
        var e_0 = iterator_0.next();
        var v_0 = e_0.y;
        if (Kotlin.compareTo(minValue_0, v_0) > 0) {
          minElem_0 = e_0;
          minValue_0 = v_0;
        }
      }
      minBy$result_0 = minElem_0;
    }
     while (false);
    var tmp$_0 = ensureNotNull(minBy$result_0).y;
    var minBy$result_1;
    minBy$break: do {
      var iterator_1 = $receiver.iterator();
      if (!iterator_1.hasNext()) {
        minBy$result_1 = null;
        break minBy$break;
      }
      var minElem_1 = iterator_1.next();
      var minValue_1 = minElem_1.z;
      while (iterator_1.hasNext()) {
        var e_1 = iterator_1.next();
        var v_1 = e_1.z;
        if (Kotlin.compareTo(minValue_1, v_1) > 0) {
          minElem_1 = e_1;
          minValue_1 = v_1;
        }
      }
      minBy$result_1 = minElem_1;
    }
     while (false);
    var minPoint = new THREE$Vector3(tmp$, tmp$_0, ensureNotNull(minBy$result_1).z);
    var maxBy$result;
    maxBy$break: do {
      var iterator_2 = $receiver.iterator();
      if (!iterator_2.hasNext()) {
        maxBy$result = null;
        break maxBy$break;
      }
      var maxElem = iterator_2.next();
      var maxValue = maxElem.x;
      while (iterator_2.hasNext()) {
        var e_2 = iterator_2.next();
        var v_2 = e_2.x;
        if (Kotlin.compareTo(maxValue, v_2) < 0) {
          maxElem = e_2;
          maxValue = v_2;
        }
      }
      maxBy$result = maxElem;
    }
     while (false);
    var tmp$_1 = ensureNotNull(maxBy$result).x;
    var maxBy$result_0;
    maxBy$break: do {
      var iterator_3 = $receiver.iterator();
      if (!iterator_3.hasNext()) {
        maxBy$result_0 = null;
        break maxBy$break;
      }
      var maxElem_0 = iterator_3.next();
      var maxValue_0 = maxElem_0.y;
      while (iterator_3.hasNext()) {
        var e_3 = iterator_3.next();
        var v_3 = e_3.y;
        if (Kotlin.compareTo(maxValue_0, v_3) < 0) {
          maxElem_0 = e_3;
          maxValue_0 = v_3;
        }
      }
      maxBy$result_0 = maxElem_0;
    }
     while (false);
    var tmp$_2 = ensureNotNull(maxBy$result_0).y;
    var maxBy$result_1;
    maxBy$break: do {
      var iterator_4 = $receiver.iterator();
      if (!iterator_4.hasNext()) {
        maxBy$result_1 = null;
        break maxBy$break;
      }
      var maxElem_1 = iterator_4.next();
      var maxValue_1 = maxElem_1.z;
      while (iterator_4.hasNext()) {
        var e_4 = iterator_4.next();
        var v_4 = e_4.z;
        if (Kotlin.compareTo(maxValue_1, v_4) < 0) {
          maxElem_1 = e_4;
          maxValue_1 = v_4;
        }
      }
      maxBy$result_1 = maxElem_1;
    }
     while (false);
    var maxPoint = new THREE$Vector3(tmp$_1, tmp$_2, ensureNotNull(maxBy$result_1).z);
    var pointsWidth = maxPoint.x - minPoint.x;
    var pointsHeight = maxPoint.y - minPoint.y;
    var pointsDepth = maxPoint.z - minPoint.z;
    var a = width / pointsWidth;
    var b = height / pointsHeight;
    var a_0 = Math_0.min(a, b);
    var b_0 = depth / pointsDepth;
    var minScale = Math_0.min(a_0, b_0);
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$_3;
    tmp$_3 = $receiver.iterator();
    while (tmp$_3.hasNext()) {
      var item = tmp$_3.next();
      var tmp$_4 = destination.add_11rb$;
      var transform$result;
      if (item === LSystem3d$Companion_getInstance().emptyVector) {
        transform$result = item;
      }
       else {
        item.multiplyScalar(minScale);
        item.set(item.x + x1 - minPoint.x * minScale + (width - pointsWidth * minScale) / 2, item.y + y1 - minPoint.y * minScale + (height - pointsHeight * minScale) / 2, item.z + z1 - minPoint.z * minScale + (depth - pointsDepth * minScale) / 2);
        transform$result = item;
      }
      tmp$_4.call(destination, transform$result);
    }
    return destination;
  }
  var push = defineInlineFunction('lsystem-js.lsystem.push_dxn8qf$', function ($receiver, e) {
    return $receiver.push(e);
  });
  var pop = defineInlineFunction('lsystem-js.lsystem.pop_4b5429$', function ($receiver) {
    return $receiver.pop();
  });
  var get_length = defineInlineFunction('lsystem-js.lsystem.get_length_qjns17$', function ($receiver) {
    return $receiver.length;
  });
  function applyDynamic($receiver, f) {
    f($receiver);
    return $receiver;
  }
  var kochSnowflake;
  var cesaroFractal;
  var quadraticType2Curve;
  var hilbertCurve;
  var lindenmayerCurve;
  var gosperCurve;
  var sierpinskiTriangle;
  var sierpinskiArrowheadCurve;
  var dragonCurve;
  var fractalPlant;
  var hilbertCurve3d;
  var kochCurve3d;
  var package$lsystem = _.lsystem || (_.lsystem = {});
  package$lsystem.LSystem = LSystem;
  $$importsForInline$$['lsystem-js'] = _;
  package$lsystem.toPoints_c1up3s$ = toPoints;
  Object.defineProperty(LSystem3d, 'Companion', {
    get: LSystem3d$Companion_getInstance
  });
  package$lsystem.LSystem3d = LSystem3d;
  package$lsystem.toRadians_s8ev3n$ = toRadians;
  package$lsystem.toDegrees_yrwdxr$ = toDegrees;
  package$lsystem.toRadians_yrwdxr$ = toRadians_0;
  package$lsystem.toXYZString_6oizvm$ = toXYZString;
  package$lsystem.main = main;
  WebUI$LSystem3dPresenter.ConfigurableLSystem = WebUI$LSystem3dPresenter$ConfigurableLSystem;
  WebUI.LSystem3dPresenter = WebUI$LSystem3dPresenter;
  package$lsystem.WebUI = WebUI;
  package$lsystem.fitCenteredInto_xk50sz$ = fitCenteredInto;
  package$lsystem.push_dxn8qf$ = push;
  package$lsystem.pop_4b5429$ = pop;
  package$lsystem.get_length_qjns17$ = get_length;
  package$lsystem.applyDynamic_isrcn9$ = applyDynamic;
  Object.defineProperty(package$lsystem, 'kochSnowflake', {
    get: function () {
      return kochSnowflake;
    }
  });
  Object.defineProperty(package$lsystem, 'cesaroFractal', {
    get: function () {
      return cesaroFractal;
    }
  });
  Object.defineProperty(package$lsystem, 'quadraticType2Curve', {
    get: function () {
      return quadraticType2Curve;
    }
  });
  Object.defineProperty(package$lsystem, 'hilbertCurve', {
    get: function () {
      return hilbertCurve;
    }
  });
  Object.defineProperty(package$lsystem, 'lindenmayerCurve', {
    get: function () {
      return lindenmayerCurve;
    }
  });
  Object.defineProperty(package$lsystem, 'gosperCurve', {
    get: function () {
      return gosperCurve;
    }
  });
  Object.defineProperty(package$lsystem, 'sierpinskiTriangle', {
    get: function () {
      return sierpinskiTriangle;
    }
  });
  Object.defineProperty(package$lsystem, 'sierpinskiArrowheadCurve', {
    get: function () {
      return sierpinskiArrowheadCurve;
    }
  });
  Object.defineProperty(package$lsystem, 'dragonCurve', {
    get: function () {
      return dragonCurve;
    }
  });
  Object.defineProperty(package$lsystem, 'fractalPlant', {
    get: function () {
      return fractalPlant;
    }
  });
  Object.defineProperty(package$lsystem, 'hilbertCurve3d', {
    get: function () {
      return hilbertCurve3d;
    }
  });
  Object.defineProperty(package$lsystem, 'kochCurve3d', {
    get: function () {
      return kochCurve3d;
    }
  });
  kochSnowflake = new LSystem3d('F--F--F', mapOf_0(to(toBoxedChar(70), 'F+F--F+F')), math.PI / 3, true);
  cesaroFractal = new LSystem3d('F', mapOf_0(to(toBoxedChar(70), 'F+F-F-F+F')), toRadians(85));
  quadraticType2Curve = new LSystem3d('F', mapOf_0(to(toBoxedChar(70), 'F+F-F-FF+F+F-F')), math.PI / 2);
  hilbertCurve = new LSystem3d('A', mapOf([to(toBoxedChar(65), '-BF+AFA+FB-'), to(toBoxedChar(66), '+AF-BFB-FA+')]), math.PI / 2);
  lindenmayerCurve = new LSystem3d('X', mapOf([to(toBoxedChar(88), 'XFYFX+F+YFXFY-F-XFYFX'), to(toBoxedChar(89), 'YFXFY-F-XFYFX+F+YFXFY')]), math.PI / 2);
  gosperCurve = new LSystem3d('F', mapOf([to(toBoxedChar(70), 'F-G--G+F++FF+G-'), to(toBoxedChar(71), '+F-GG--G-F++F+G')]), toRadians(60));
  sierpinskiTriangle = new LSystem3d('F-G-G', mapOf([to(toBoxedChar(70), 'F-G+F+G-F'), to(toBoxedChar(71), 'GG')]), toRadians(120));
  sierpinskiArrowheadCurve = new LSystem3d('F', mapOf([to(toBoxedChar(70), 'G-F-G'), to(toBoxedChar(71), 'F+G+F')]), math.PI / 3);
  dragonCurve = new LSystem3d('FX', mapOf([to(toBoxedChar(88), 'X+YF+'), to(toBoxedChar(89), '-FX-Y')]), math.PI / 2);
  fractalPlant = new LSystem3d('X', mapOf([to(toBoxedChar(88), 'F[-X][X]F[-X]+FX'), to(toBoxedChar(70), 'FF')]), toRadians(25));
  hilbertCurve3d = new LSystem3d('X', mapOf_0(to(toBoxedChar(88), '^<XF^<XFX-F^>>XFX&F+>>XFX-F>X->')), math.PI / 2);
  kochCurve3d = new LSystem3d('A', mapOf([to(toBoxedChar(65), '[[[[F+F-F-F+F]G<G>G>G<G]H-H+H+H-H]I>I<I<I>I]'), to(toBoxedChar(70), 'F+F-F-F+F'), to(toBoxedChar(71), 'G<G>G>G<G'), to(toBoxedChar(72), 'H-H+H+H-H'), to(toBoxedChar(73), 'I>I<I<I>I')]), math.PI / 2);
  Kotlin.defineModule('lsystem-js', _);
  return _;
}));

//# sourceMappingURL=lsystem-js.js.map
