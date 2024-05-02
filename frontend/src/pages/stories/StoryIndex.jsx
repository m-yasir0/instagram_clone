import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadStoriesAction } from '../../reduxState/actions/storyActions';
import Story from './Story';

const StoryIndex = () => {
  let dispatcher = useDispatch();
  let { stories } = useSelector((state) => state.stories);

  useEffect(() => {
    dispatcher(loadStoriesAction());
  }, []);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-12 layout-spacing'>
          <div className='statbox widget box box-shadow'>
            <div className='widget-header'>
              <div className='row'>
                <div className='col-xl-12 col-md-12 col-sm-12 col-12'>
                  <h4 className='pb-0'>Stories</h4>
                </div>
              </div>
            </div>
            <div className='widget-content widget-content-area'>
              <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12'>
                  <div id='content_1' className='tabcontent story-area'>
                    <div className='story-container-1'>
                      <div className='single-create-story'>
                        <img
                          src='https://bootdey.com/img/Content/avatar/avatar1.png'
                          alt='fake'
                          className='single-create-story-bg'
                        />
                        <div className='create-story-author'>
                          <p>
                            <Link to={'/stories/new'} className='text-white'>
                              Create a Story
                            </Link>
                          </p>
                          <h3 className='text-white'>+</h3>
                        </div>
                      </div>
                      {stories && stories.length > 0 ? (
                        stories.map((val) => {
                          return <Story key={val.id} story={val} />;
                        })
                      ) : (
                        <div className='row'>
                          <div className='text-center'>No Stories to show</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryIndex;
