from flask import Flask, render_template, request, redirect, url_for, json
import requests

app = Flask(__name__)

# This will identify the address of the webpage that
# requested the feedback form. By checking the referrer,
# we can see from where the request originated.
# def feedback_referrer():
# ref = unicode(request.referrer)
# return ref

# feedback_ref = "http://virtual-labs.ac.in/labs/cse18/"
feedback_ref = None


@app.route('/feedback', methods=['GET', 'POST'])
def feedback_form():
    if request.method == 'GET':
        if feedback_ref is not None:
            response = requests.get('http://localhost:5000/labs/1')
            lab = response.json()
            return render_template('feedback.html',
                                   lab_name=lab['name'],
                                   lab_id=lab['id'])
        else:
            response = requests.get('http://localhost:5000/labs')
            index = 0
            labs_list = []
            while index < len(response.json()):
                labs_list.append(response.json()[index])
                index = index + 1

            return render_template('feedback.html',
                                   labs_list=labs_list)

    if request.method == 'POST':
        feedback_data = request.form.to_dict()
        if feedback_ref is not None:
            feedback_data['lab'] = {'id': request.form.get('lab_id')}
            feedback_data.pop('lab_id')
        else:
            feedback_data['lab'] = {'id': request.form.get('lab')}
        if not feedback_data['user_email']:
            feedback_data.pop('user_email')
        if not feedback_data['experiment']:
            feedback_data.pop('experiment')
#        if request.form.get('experiment_id'):
#            feedback_data['experiment'] = {'id':
#                                           request.form.get('experiment_id')}
        feedback_data['ip'] = request.remote_addr
        print json.dumps(feedback_data)
        response = requests.post('http://localhost:5000/feedback',
                                 data=json.dumps(feedback_data))
        if response.status_code == 200:
            return redirect(url_for('thanks'))
        else:
            return "Error posting your feedback"


@app.route('/thanks')
def thanks():
    return render_template('thanks.html')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
